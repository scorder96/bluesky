import { Clock, Edit, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import TimePicker from "./ui/TimePicker";
import pb from "~/pocketbase";
import PostInput from "./PostInput";
import useJSONBuilder from "~/hooks/useJSONBuilder";

interface Props {
  onScheduled: () => void;
}
export function PostNew({ onScheduled }: Props) {
  const [Post, setPost] = useState(String);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [Time, setTime] = useState("09:00");
  const [WebEmbed, setWebEmbed] = useState(Object);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(String);
  const today = new Date();

  // const isWhitespaceChar = (char: string) => {
  //   return (
  //     char === " " ||
  //     char === "\t" ||
  //     char === "\n" ||
  //     char === "\r" ||
  //     char === "\f" ||
  //     char === " "
  //   );
  // };

  async function schedulePost() {
    setError("");
    if (!Time) {
      setError("Please select the time");
      return;
    } else {
      date?.setHours(parseInt(Time.slice(0, 2)));
      date?.setMinutes(parseInt(Time.slice(3, 5)));
    }
    if (date! < today) {
      setError("Please select a future time");
      return;
    }
    setLoading(true);
    const dataOrg = localStorage.getItem("ALLDATA");
    const localData = JSON.parse(dataOrg!);

    const postDate = new Date();
    const [hours, minutes] = Time.split(":").map(Number);
    postDate.setMonth(date?.getMonth()!, date?.getDate()!);
    postDate.setHours(hours, minutes, 0, 0);

    const profileRecord = await pb
      .collection("profiles")
      .getFirstListItem(`handle="${localData.profileData.handle}"`);
    const postJSON = await useJSONBuilder(Post, WebEmbed);
    const data = {
      profile: profileRecord.id,
      post: postJSON,
      postAt: postDate.toISOString(),
    };
    // console.log(data);

    const record = await pb.collection("schedule").create(data);
    if (record) {
      onScheduled();
    }
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <Edit /> New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a post</DialogTitle>
        </DialogHeader>
        <PostInput
          onPostChange={setPost}
          post={Post}
          onWebEmbed={setWebEmbed}
        />
        {/* <div
          ref={divRef}
          className="w-full min-h-[6rem] ps-0 p-2 text-lg border-none focus:outline-none bg-transparent overflow-auto"
          contentEditable
          onInput={handleInput}
          role="textbox"
          aria-multiline="true"
        /> */}
        <div className="flex space-x-4">
          <DatePicker onDateSelect={setDate} date={date} />
          <TimePicker onTimeSelect={setTime} time={Time} />
        </div>
        {Error && <p className="text-red-500">{Error}</p>}
        <DialogFooter>
          <Button type="button" onClick={schedulePost} disabled={Loading}>
            {Loading ? (
              <>
                <Loader2 className="animate-spin" /> Scheduling
              </>
            ) : (
              <>
                <Clock /> Schedule
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
