import { ChevronLeft, ChevronRight, Clock, Hash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import BestTimes from "~/components/BestTimes";
import { PostNew } from "~/components/PostNew";
import ScheduleSheet from "~/components/ScheduleSheet";
import { Button } from "~/components/ui/button";
import { buildCalendar, days, months } from "~/data/time";
import pb from "~/pocketbase";

export default function Schedule() {
  const [Month, setMonth] = useState(new Date().getMonth());
  useEffect(() => {
    setScheduleDate([]);
    getSchedule();
  }, [Month]);
  const [ScheduleDate, setScheduleDate] = useState(Array<number>);
  const [ScheduleTime, setScheduleTime] = useState(Array<string>);
  const [Posts, setPosts] = useState(Array<string>);
  const [ScheduleIDs, setScheduleIDs] = useState(Array<string>);
  const [Loading, setLoading] = useState(false);

  const dateList = buildCalendar(Month).dateList;
  const thismonthList = buildCalendar(Month).thismonthList;

  function gridStyler(day: number, index: number) {
    const date = new Date();
    const today = date.getDate();
    var classString = "";
    if (
      !thismonthList[index] ||
      (day < today && Month == date.getMonth()) ||
      Month < date.getMonth()
    ) {
      classString = "border-2 opacity-40 bg-neutral-200";
      return classString;
    }
    if (day == today && Month == date.getMonth()) {
      classString = "border-2 border-primary";
      return classString;
    }
  }
  async function getSchedule() {
    setLoading(true);
    var scheduleDate: Array<number> = [];
    var scheduleTime: Array<string> = [];
    var posts: Array<string> = [];
    var scheduleIDs: Array<string> = [];
    const records = await pb
      .collection("schedule")
      .getFullList({ expand: "profile" });
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    records.forEach((record) => {
      if (record.expand!.profile.did != data.profileData.did) {
        return;
      }

      const recordDate = new Date(record.postAt);
      if (recordDate.getMonth() == Month) {
        scheduleDate.push(recordDate.getDate());
        scheduleTime.push(
          recordDate.getHours() + ":" + recordDate.getMinutes()
        );
        posts.push(record.post);
        scheduleIDs.push(record.id);
      }
    });
    setScheduleDate(scheduleDate);
    setScheduleTime(scheduleTime);
    setPosts(posts);
    setScheduleIDs(scheduleIDs);
    setLoading(false);
  }
  function filter(day: number) {
    var scheduleDate: Array<number> = [];
    var scheduleTime: Array<string> = [];
    var posts: Array<string> = [];
    var scheduleIDs: Array<string> = [];
    for (let i = 0; i < ScheduleDate.length; i++) {
      if (ScheduleDate[i] == day) {
        scheduleDate.push(day);
        scheduleTime.push(ScheduleTime[i]);
        posts.push(Posts[i]);
        scheduleIDs.push(ScheduleIDs[i]);
      }
    }
    return { scheduleDate, scheduleTime, posts, scheduleIDs };
  }
  const date = new Date();
  const currentMonth = date.getMonth();

  return (
    <div className="col-span-6 md:col-span-5 p-8 flex flex-col">
      <div className="grid grid-cols-7 gap-2 text-sm opacity-50">
        {days.map((day) => {
          return <p key={day}>{day}</p>;
        })}
      </div>
      {Loading ? (
        <Loader2 className="animate-spin mx-auto h-96 md:my-auto text-primary" />
      ) : (
        <div className="h-96 grid grid-cols-7 mt-4 mb-8 md:grow auto-rows-fr">
          {dateList.map((day, index) => {
            // const scheduledToday = ScheduleDate.filter((item) => item === day);
            const filterOperation = filter(day);
            const noOfPosts = filterOperation.scheduleDate.length;
            const date = new Date();
            const today = date.getDate();
            const nonSchedulableDay =
              !thismonthList[index] ||
              (day < today && Month == date.getMonth()) ||
              Month < date.getMonth();

            return (
              <div key={index}>
                {!nonSchedulableDay ? (
                  <ScheduleSheet
                    month={Month}
                    day={day}
                    scheduledDates={filterOperation.scheduleDate}
                    scheduledTimes={filterOperation.scheduleTime}
                    posts={filterOperation.posts}
                    recordids={filterOperation.scheduleIDs}
                    onClose={getSchedule}
                  >
                    <div
                      className={
                        "h-full text-left border p-2 hover:border-primary " +
                        gridStyler(day, index)
                      }
                    >
                      {day}
                      {noOfPosts > 0 && thismonthList[index] && (
                        <div className="flex justify-center items-center text-primary font-bold text-xl">
                          {noOfPosts} <Clock size={20} className="ms-1" />
                        </div>
                      )}
                    </div>
                  </ScheduleSheet>
                ) : (
                  <div
                    className={
                      "h-full text-left border p-2 " + gridStyler(day, index)
                    }
                  >
                    {day}
                    {noOfPosts > 0 && thismonthList[index] && (
                      <div className="flex justify-center items-center text-primary font-bold text-xl">
                        {noOfPosts} <Clock size={20} className="ms-1" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="space-x-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setMonth(Month - 1)}
              disabled={Month <= currentMonth}
            >
              <ChevronLeft />
            </Button>
            <span className="opacity-50">{months[Month]}</span>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setMonth(Month + 1)}
              disabled={Month == 11}
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="hidden md:block">
            <BestTimes />
          </div>
        </div>
        {/* <Button variant={"secondary"}>
          <Hash /> Top Hashtags
        </Button> */}
        <PostNew onScheduled={getSchedule} />
      </div>
      <div className="md:hidden mt-4">
        <BestTimes />
      </div>
    </div>
  );
}
