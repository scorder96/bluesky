import { useNavigate, useRouteError } from "@remix-run/react";
import { useEffect, useState } from "react";
import Combobox from "~/components/Combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// export async function loader({ params }: LoaderFunctionArgs) {
//   const agent = new AtpAgent({
//     service: "https://bsky.social",
//   });
//   await agent.login({
//     identifier: import.meta.env.VITE_BSKY_USER,
//     password: import.meta.env.VITE_BSKY_PASS,
//   });
//   const { data: profileData } = await agent.getProfile({ actor: params.id! });

//   const { data: postData } = await agent.getAuthorFeed({
//     actor: params.id!,
//     filter: "posts_and_author_threads",
//     limit: 100,
//   });
//   var tReplies = 0;
//   var tReposts = 0;
//   var tQuotes = 0;
//   var tLikes = 0;
//   for (let i = 0; i < postData.feed.length; i++) {
//     tReplies += postData.feed[i].post.replyCount!;
//     tReposts += postData.feed[i].post.repostCount!;
//     tQuotes += postData.feed[i].post.quoteCount!;
//     tLikes += postData.feed[i].post.likeCount!;
//   }
//   const total = { tReplies, tReposts, tQuotes, tLikes };
//   return { profileData, total };
// }
export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="col-span-5 flex flex-col justify-center items-center">
      <h2>Cannot fetch data | Rate limit exceeded</h2>
      <p className="text-sm mt-4">
        Please come back in an hour, or connect to a different network and
        refresh.
      </p>
    </div>
  );
}
export default function Profile() {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
  }, []);
  const [state, setstate] = useState<any>();
  // const data = {
  //   displayName: "scorder",
  //   handle: "scorder.bsky.social",
  //   followersCount: 2,
  //   followsCount: 6,
  //   postsCount: 2,
  //   description: "asdasd",
  //   banner: null,
  //   avatar: null,
  // };
  const navigate = useNavigate();

  return (
    <div className="col-span-6 md:col-span-5 flex flex-col justify-center items-center px-8 space-y-4">
      <Card className="md:w-1/2">
        <CardHeader>
          {state?.profileData.banner ? (
            <img src={state?.profileData.banner} alt="user banner" />
          ) : (
            <span className="text-red-500">Banner not found</span>
          )}
          {state?.profileData.avatar ? (
            <img
              src={state?.profileData.avatar}
              alt="user avatar"
              height={50}
              width={50}
              className="rounded-full"
            />
          ) : (
            <span className="text-red-500">Avatar not found</span>
          )}
          <CardTitle>{state?.profileData.displayName}</CardTitle>
          <CardDescription>@{state?.profileData.handle}</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4 text-sm">
          <h3>
            {state?.profileData.followersCount}{" "}
            <span className="opacity-50">followers</span>
          </h3>
          <h3>
            {state?.profileData.followsCount}{" "}
            <span className="opacity-50">following</span>
          </h3>
          <h3>
            {state?.profileData.postsCount}{" "}
            <span className="opacity-50">posts</span>
          </h3>
        </CardContent>
        <CardFooter className="text-sm">
          {state?.profileData.description}
        </CardFooter>
      </Card>
      <Combobox
        list={["+ Add profile"]}
        placeholder="switch"
        onSelected={() => {
          navigate("/pro");
        }}
      />
    </div>
  );
  // return <></>;
}
