import { Link, useParams, useRouteError } from "@remix-run/react";
import {
  Flame,
  Heart,
  MessageSquare,
  Quote,
  Repeat,
  StickyNote,
} from "lucide-react";
import { useEffect, useState } from "react";
import Combobox from "~/components/Combobox";
import ContributionTracker from "~/components/ConsistencyTracker";
import LineChartComponent from "~/components/LineChart";
import { properties } from "~/data/combobox";
import pb from "~/pocketbase";

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
export default function Statistics() {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
  }, []);
  const [state, setstate] = useState<any>();
  // const data = useLoaderData<typeof loader>();
  const params = useParams();
  // const globalState = useGlobalState();
  const date = new Date();
  var today = date.getDate();
  var streak = 0;
  // const data = {
  //   dateArray: [8, 9],
  //   tReplies: 3,
  //   tReposts: 2,
  //   tQuotes: 2,
  //   tLikes: 2,
  //   posts: 1,
  // };

  while (today != 0) {
    if (state?.dateArray.includes(today)) {
      streak++;
    } else {
      break;
    }
    today--;
  }

  const [chartData, setChartData] = useState(Array<object>);
  // var chartData: Array<object> = [];
  async function generateChart(value: String) {
    const tempchartData = [];
    const resultList = await pb.collection("tracker").getList(1, 7, {
      filter: `handle="${state?.profileData.handle}"`,
      sort: "created",
    });

    for (let i = 0; i < resultList.items.length; i++) {
      const recordItem = resultList.items[i];
      const recordDate = resultList.items[i].created;
      const date = new Date(recordDate);
      const finalDate = date.getDate();
      var property;
      switch (value) {
        case "Followers":
          property = recordItem.followers;
          break;
        case "Engagement":
          property =
            recordItem.replies +
            recordItem.reposts +
            recordItem.quotes +
            recordItem.likes;
          break;
        case "Posts":
          property = recordItem.posts;
          break;
        case "Replies":
          property = recordItem.replies;
          break;
        case "Reposts":
          property = recordItem.reposts;
          break;
        case "Quotes":
          property = recordItem.quotes;
          break;
        case "Likes":
          property = recordItem.likes;
          break;
        default:
          break;
      }
      const obj = { name: finalDate, property: property };
      tempchartData[i] = obj;
    }
    setChartData(tempchartData);
  }
  return (
    <div className="col-span-6 md:col-span-5 px-6 py-8 space-y-4 overflow-y-auto">
      {/* <Combobox
        list={frequency}
        placeholder="time frame"
        onSelected={() => console.log("asd")}
      /> */}
      <div className="[&>div]:border [&>div]:px-8 [&>div]:py-2 grid md:grid-rows-2 md:grid-cols-3 grid-rows-3">
        <div className="flex justify-between items-center row-span-2">
          <div className="flex items-center">
            <StickyNote size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Posts</span>
          </div>
          <b>{state?.profileData.postsCount} </b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Replies</span>
          </div>
          <b>{state?.tReplies}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Repeat size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Reposts</span>
          </div>
          <b>{state?.tReposts}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Quote size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Quotes</span>
          </div>
          <b>{state?.tQuotes}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Heart size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Likes</span>
          </div>
          <b>{state?.tLikes}</b>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="mb-2 font-bold flex justify-between mt-8">
          <h1>Consistency</h1>
          <div className="flex items-center">
            <span>{streak}</span>
            <Flame size={16} color="orange" className="ms-2" />
          </div>
        </div>
        <ContributionTracker dateArray={state?.dateArray} />
      </div>
      <div className="h-60 md:w-1/2">
        <div className="mb-2 font-bold flex justify-between items-center mt-8">
          <h1>Growth</h1>
          <Combobox
            list={properties}
            placeholder="select"
            onSelected={generateChart}
          />
        </div>
        <LineChartComponent chartData={chartData} />
      </div>
      {chartData.length == 0 && (
        <p className="pt-4">Select a property to see data 👆</p>
      )}
      {chartData.length == 1 &&
        (pb.authStore.isValid ? (
          <p className="pt-4">
            You don't see much growth data since we haven't been tracking. We
            will start tracking this profile from now.
          </p>
        ) : (
          <p className="pt-4">
            You don't see much growth data since we haven't been tracking.{" "}
            <Link to={"/sign-up"} className="font-bold text-primary">
              Sign up
            </Link>{" "}
            to start tracking growth data.
          </p>
        ))}
      <div className="h-16" />
      {/* Consistency
        <div className="grid grid-cols-12">
          <ul className="grid grid-rows-8">
            <div />
            <div className="row-span-7 text-xs">
              {days.map((day) => {
                return <li>{day}</li>;
              })}
            </div>
          </ul>
          <ul className="flex justify-between col-span-11 text-xs">
            {months.map((month) => {
              return (
                <header>
                  {month}
                  <div className="grid grid-cols-4 mt-2">
                    {week.map((week) => {
                      return <div className="bg-neutral-200 h-2 w-2 me-2" />;
                    })}
                  </div>
                </header>
              );
            })}
          </ul>
        </div> */}
    </div>
  );
}
