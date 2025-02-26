import { Loader2, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "./ui/button";
import pb from "~/pocketbase";
import { useState } from "react";
interface Props {
  children: React.ReactNode;
  month: number;
  day: number;
  scheduledDates: Array<number>;
  scheduledTimes: Array<string>;
  posts: Array<any>;
  recordids: Array<string>;
  onClose: () => void;
}

export default function ScheduleSheet({
  children,
  month,
  day,
  scheduledDates,
  scheduledTimes,
  posts,
  recordids,
  onClose,
}: Props) {
  const [Loading, setLoading] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const date = new Date();
  date.setMonth(month);
  date.setDate(day);
  async function deleteSchedule(id: string, i: number) {
    setLoading(true);
    await pb.collection("schedule").delete(id);
    scheduledDates.splice(i, 1);
    scheduledTimes.splice(i, 1);
    posts.splice(i, 1);
    recordids.splice(i, 1);
    setDeleted(true);
    setLoading(false);
  }
  function checkCloseBehaviour(open: boolean) {
    if (open == false && Deleted == true) {
      onClose();
    }
  }
  return (
    <Sheet onOpenChange={checkCloseBehaviour}>
      <SheetTrigger className="w-full h-full">{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{date.toDateString()}</SheetTitle>
          <SheetDescription>Check your scheduled posts</SheetDescription>
        </SheetHeader>
        <p className="mt-8">
          <b>{scheduledDates.length}</b> post(s) scheduled on this day.
        </p>
        <ul className="mt-4">
          {scheduledDates.map((scheduledDate, index) => {
            return (
              <li
                className="flex justify-between items-center border shadow p-2 mb-4"
                key={index}
              >
                <div>
                  <i>At {scheduledTimes[index]}</i>
                  <br />
                  <p className="mt-2">{posts[index].text}</p>
                </div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="hover:bg-red-500 hover:text-white"
                  onClick={() => deleteSchedule(recordids[index], index)}
                  disabled={Loading}
                >
                  {Loading ? <Loader2 className="animate-spin" /> : <Trash />}
                </Button>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
