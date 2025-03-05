import { Link, useParams, useRouteError } from "@remix-run/react";
import {
  Flame,
  Heart,
  Loader2,
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
  const [state, setstate] = useState<any>();
  const [ReplyCount, setReplyCount] = useState(Number);
  const [RepostCount, setRepostCount] = useState(Number);
  const [QuoteCount, setQuoteCount] = useState(Number);
  const [LikeCount, setLikeCount] = useState(Number);
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
    for (let i = 0; i < data.feedData.length; i++) {
      const post = data.feedData[i].post;
      if (!data.feedData[i].reason) {
        replyCount += post.replyCount;
        repostCount += post.repostCount;
        quoteCount += post.quoteCount;
        likeCount += post.likeCount;
      }
    }
    setReplyCount(replyCount);
    setRepostCount(repostCount);
    setQuoteCount(quoteCount);
    setLikeCount(likeCount);
    generateChart(properties[0], data);
  }, []);
  var replyCount = 0;
  var repostCount = 0;
  var quoteCount = 0;
  var likeCount = 0;

  const [DataValue, setDataValue] = useState("Followers");
  const [Loading, setLoading] = useState(false);

  function calculateStreaks(postDates: number[][]): {
    maxStreak: number;
    currentStreak: number;
  } {
    let maxStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;
    let lastDate: number | null = null;

    // Flatten, remove duplicates, and sort in descending order (so today is first)
    const allDates = [...new Set(postDates.flat())].sort((a, b) => b - a);

    const today = new Date().getDate();
    let isCurrentStreakActive = false;

    for (let i = 0; i < allDates.length; i++) {
      if (lastDate !== null && allDates[i] === lastDate - 1) {
        // Continue streak
        tempStreak++;
      } else if (lastDate !== null && allDates[i] !== lastDate) {
        // Streak broken, save max streak
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 1;
      }

      // Check if today's date is part of the streak
      if (allDates[i] === today) {
        isCurrentStreakActive = true;
      }

      lastDate = allDates[i];
    }

    // Final max streak check
    maxStreak = Math.max(maxStreak, tempStreak);

    // If today is part of the streak, set current streak
    if (isCurrentStreakActive) {
      currentStreak = tempStreak;
    }

    return { maxStreak, currentStreak };
  }

  const date = new Date();
  const { maxStreak, currentStreak } = state
    ? calculateStreaks(state?.dateArray)
    : { maxStreak: 0, currentStreak: 0 };
  console.log(state?.dateArray);

  const [chartData, setChartData] = useState(Array<object>);

  async function generateChart(value: string, data?: any) {
    setLoading(true);
    setDataValue(value);
    const handle = state ? state.profileData.handle : data.profileData.handle;
    const tempchartData = [];

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const filter = `handle = "${handle}" && created > "${sevenDaysAgo.toISOString()}"`;
    const resultList = await pb.collection("tracker").getList(1, 7, {
      filter: filter,
      sort: "created",
    });

    for (let i = 0; i < resultList.items.length; i++) {
      const recordItem = resultList.items[i];
      const recordDate = resultList.items[i].created;
      const date = new Date(recordDate);
      const finalDate = date.getUTCDate();
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
    setLoading(false);
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
          <b>{ReplyCount}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Repeat size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Reposts</span>
          </div>
          <b>{RepostCount}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Quote size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Quotes</span>
          </div>
          <b>{QuoteCount}</b>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Heart size={16} className="me-2 opacity-50" />
            <span className="text-sm opacity-50">Likes</span>
          </div>
          <b>{LikeCount}</b>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="mb-2 flex justify-between mt-8">
          <h1 className="font-bold">Consistency</h1>
          <div className="flex items-center">
            <Flame size={16} color="orange" className="me-1" />
            <div>
              <span className="font-bold">{currentStreak}&nbsp;</span>
              <span className="text-xs opacity-50">day streak</span>
            </div>
          </div>
        </div>
        {state && <ContributionTracker dateArray={state?.dateArray[0]} />}
        <div className="mt-4 flex items-center">
          <Flame size={16} color="orange" className="me-1" />
          <div>
            <span className="font-bold">{maxStreak}&nbsp;</span>
            <span className="text-xs opacity-50">max posting streak</span>
          </div>
        </div>
      </div>
      <div className="h-60 md:w-1/2">
        <div className="mb-2 font-bold flex justify-between items-center mt-8">
          <h1>Growth</h1>
          <Combobox
            list={properties}
            placeholder="select"
            onSelected={generateChart}
            defaultSelection={properties[0]}
          />
        </div>
        {Loading ? (
          <Loader2 className="animate-spin text-primary" />
        ) : (
          <LineChartComponent chartData={chartData} dataKey={DataValue} />
        )}
      </div>
      {/* {chartData.length == 0 && (
        <p className="pt-4">Select a property to see data 👆</p>
      )} */}
      <div className="h-4" />
      {chartData.length == 1 &&
        (pb.authStore.isValid ? (
          <p>
            You don't see much growth data since we haven't been tracking. We
            will start tracking this profile from now.
          </p>
        ) : (
          <p>
            You don't see much growth data since we haven't been tracking.{" "}
            <Link
              to={"/sign-up?redirectTo=/statistics"}
              className="font-bold text-primary"
            >
              Sign up
            </Link>{" "}
            to start tracking growth data.
          </p>
        ))}
      <div className="h-16" />
    </div>
  );
}
