import { AtpAgent } from "@atproto/api";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { Calendar, ChartLine, StickyNote, User, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { sidebar } from "~/data/sidebar";
import useGlobalState from "~/hooks/useGlobalState";
import pb from "~/pocketbase";

export async function loader({ params }: LoaderFunctionArgs) {
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });
  await agent.login({
    identifier: import.meta.env.VITE_BSKY_USER,
    password: import.meta.env.VITE_BSKY_PASS,
  });
  const { data: profileData } = await agent.getProfile({ actor: params.id! });
  const { data: postData } = await agent.getAuthorFeed({
    actor: params.id!,
    filter: "posts_and_author_threads",
    limit: 100,
  });

  var tReplies = 0;
  var tReposts = 0;
  var tQuotes = 0;
  var tLikes = 0;
  var posts = 0;
  var dateArray = [];
  for (let i = 0; i < postData.feed.length; i++) {
    posts++;
    tReplies += postData.feed[i].post.replyCount!;
    tReposts += postData.feed[i].post.repostCount!;
    tQuotes += postData.feed[i].post.quoteCount!;
    tLikes += postData.feed[i].post.likeCount!;
    // @ts-ignore
    const timestamp = postData.feed[i].post.record.createdAt;
    const date = new Date(timestamp);
    if (date.getFullYear() == 2024 && date.getMonth() == 11) {
      dateArray[i] = date.getDate();
    }
  }
  const feedData = postData.feed;
  return { profileData, feedData, posts, tReplies, tReposts, tQuotes, tLikes, dateArray };
}

export default function Root() {
  useEffect(() => {
    localStorage.setItem("ALLDATA", JSON.stringify(data));
    upload();
    // const ALLDATA = {
    //   data.profileData.avatar!,
    //   data.profileData.banner!,
    //   data.profileData.did,
    //   data.profileData.handle,
    //   data.profileData.followersCount!,
    //   data.profileData.followsCount!,
    //   data.profileData.postsCount!,
    //   data.profileData.displayName!,
    //   data.profileData.description!,
    //   data.posts,
    //   data.tReplies,
    //   data.tReposts,
    //   data.tQuotes,
    //   data.tLikes,
    //   data.dateArray,
    // };
    // globalState.saveState(

    // );
  }, []);
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  async function upload() {
    const pbProfileData = {
      user: pb.authStore.record?.id,
      handle: data.profileData.handle,
      did: data.profileData.did,
    };
    const recordProfile = await pb
      .collection("profiles")
      .create(pbProfileData)
      .catch(() => {});

    var pbTrackerData;
    var profileID;
    // IF PROFILE ALREADY EXISTS
    if (!recordProfile) {
      const record = await pb
        .collection("profiles")
        .getFirstListItem(`handle="${data.profileData.handle}"`)
        .catch(() => {});
      profileID = record?.id;
      // ELSE IF NEW PROFILE
    } else {
      profileID = recordProfile!.id;
    }
    pbTrackerData = {
      profile: profileID,
      followers: data.profileData.followersCount,
      posts: data.profileData.postsCount,
      replies: data.tReplies,
      reposts: data.tReposts,
      quotes: data.tQuotes,
      likes: data.tLikes,
      did: data.profileData.did,
    };
    // const recordd = await pb
    //   .collection("tracker")
    //   .getFirstListItem(`profile="${profileID}"`)
    //   .catch(() => {});
    const todaydate = new Date();
    // Extract components
    const year = todaydate.getUTCFullYear();
    const month = String(todaydate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(todaydate.getUTCDate()).padStart(2, "0");
    const hours = String(todaydate.getUTCHours()).padStart(2, "0");
    const minutes = String(todaydate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(todaydate.getUTCSeconds()).padStart(2, "0");

    // Combine into desired format
    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    console.log(formattedDate);

    const recordd = await pb.collection("tracker").getList(1, 50, {
      filter: `created >= "${formattedDate}" && profile = "${profileID}"`,
    });
    // IF WAS ALREADY TRACKED
    if (recordd) {
      const today = new Date();
      const todayDate = today.getDate();
      for (let i = 0; i < recordd.items.length; i++) {
        const recordDate = recordd.items[i].created;
        const date = new Date(recordDate);
        const finalDate = date.getDate();

        if (finalDate == todayDate) {
          const recordTracker = await pb
            .collection("tracker")
            .update(recordd.items[i].id, pbTrackerData)
            .catch(() => {});
        } else {
          const recordTracker = await pb
            .collection("tracker")
            .create(pbTrackerData)
            .catch(() => {});
        }
      }
    }
    navigate("/profile");
  }
  return (
    <div className="h-screen flex justify-center items-center">Fetching your data...</div>
  );
}
