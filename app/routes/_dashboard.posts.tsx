import { useParams, useRouteError } from "@remix-run/react";
import { Heart, MessageSquare, Quote, Repeat } from "lucide-react";
import { useEffect, useState } from "react";
import Combobox from "~/components/Combobox";
import { fromto, sortby } from "~/data/combobox";
import useSort from "~/hooks/useSort";

// export async function loader({ params }: LoaderFunctionArgs) {
//   const agent = new AtpAgent({
//     service: "https://bsky.social",
//   });
//   await agent.login({
//     identifier: import.meta.env.VITE_BSKY_USER,
//     password: import.meta.env.VITE_BSKY_PASS,
//   });
//   const { data } = await agent.getAuthorFeed({
//     actor: params.id!,
//     filter: "posts_and_author_threads",
//     limit: 100,
//   });
//   return data.feed;
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
export default function Posts() {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data.feedData);
    setdid(data.profileData.did);
  }, []);
  const [state, setstate] = useState<any>();
  const [did, setdid] = useState<string>();
  const [firstCombobox, setFirstCombobox] = useState(String);
  const [secondCombobox, setSecondCombobox] = useState(String);
  // var data = useLoaderData<typeof loader>();
  // var data = object;
  // const { feed: postsArray, cursor: nextPage } = data;

  const params = useParams();
  const sort = useSort();
  var sorted = state;
  if (firstCombobox && secondCombobox) {
    switch (firstCombobox) {
      case "Engagement":
        sorted = sort.sortEngagement(state);
        break;
      case "Replies":
        sorted = sort.sortReplies(state);
        break;
      case "Reposts":
        var sorted = sort.sortReposts(state);
        break;
      case "Quotes":
        var sorted = sort.sortQuotes(state);
        break;
      case "Likes":
        var sorted = sort.sortLikes(state);
        break;
      default:
        break;
    }
    if (secondCombobox == "Highest to Lowest") {
      sorted = state.reverse();
    }
  }

  return (
    <div className="col-span-6 md:col-span-5 relative overflow-x-auto">
      <div className="px-6 py-4 space-x-2">
        <span>Sort by</span>
        <Combobox
          list={sortby}
          placeholder="interaction"
          onSelected={setFirstCombobox}
        />
        <Combobox
          list={fromto}
          placeholder="from"
          onSelected={setSecondCombobox}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3">
              <MessageSquare size={16} />
            </th>
            <th scope="col" className="px-6 py-3">
              <Repeat size={16} />
            </th>
            <th scope="col" className="px-6 py-3">
              <Quote size={16} />
            </th>
            <th scope="col" className="px-6 py-3">
              <Heart size={16} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted?.map((post: any, index: number) => {
            const url = `https://bsky.app/profile/${did}/post/${post.post.uri.slice(
              post.post.uri.lastIndexOf("/") + 1
            )}`;
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-neutral-100 cursor-pointer"
                onClick={() => window.open(url)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* @ts-ignore */}
                  {post.post.record.text.slice(0, 70) + "..."}
                </th>
                <td className="px-6 py-4">{post.post.replyCount}</td>
                <td className="px-6 py-4">{post.post.repostCount}</td>
                <td className="px-6 py-4">{post.post.quoteCount}</td>
                <td className="px-6 py-4">{post.post.likeCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
