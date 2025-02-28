import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { days } from "~/data/time";

export default function BestTimes() {
  useEffect(() => {
    getBestPostingTimesByDay();
  }, []);

  const [Times, setTimes] = useState<Array<number>>();
  const [Engagements, setEngagements] = useState<Array<number>>();

  function getBestPostingTimesByDay() {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    const posts = data.feedData;

    const engagementByDay: Record<
      number,
      Record<number, { total: number; count: number }>
    > = {};

    posts.forEach(({ post, reason, reply }: any) => {
      console.log();
      if (reason || reply) {
        return;
      }

      const date = new Date(post.record.createdAt);
      const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = date.getHours();

      if (!engagementByDay[day]) {
        engagementByDay[day] = {};
      }

      if (!engagementByDay[day][hour]) {
        engagementByDay[day][hour] = { total: 0, count: 0 };
      }
      const engagement =
        post.replyCount + post.repostCount + post.quoteCount + post.likeCount;
      engagementByDay[day][hour].total += engagement;
      engagementByDay[day][hour].count += 1;
    });

    const bestTimes: number[] = Array(7).fill(null); // Best posting time for each day
    const totalEngagements: number[] = Array(7).fill(0); // Total engagement at best times

    for (let day = 0; day < 7; day++) {
      const hours = engagementByDay[day] || {};

      const bestHour = Object.entries(hours)
        .map(([hour, data]) => ({
          hour: Number(hour),
          avgEngagement: data.total / data.count,
          totalEngagement: data.total,
        }))
        .sort((a, b) => b.avgEngagement - a.avgEngagement)[0]; // Sort by highest engagement

      if (bestHour) {
        bestTimes[day] = bestHour.hour;
        totalEngagements[day] = bestHour.totalEngagement;
      }
    }
    setTimes(bestTimes);
    setEngagements(totalEngagements);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"secondary"}>
          <Clock /> Best Times
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Best Times to Post</DialogTitle>
          <DialogDescription>
            Posts uploaded on theses times got the highest engagement and reach
          </DialogDescription>
        </DialogHeader>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Engagements && Times && (
              <>
                {days.map((day, index) => {
                  return (
                    <>
                      {Engagements[index] != 0 && (
                        <TableRow>
                          <TableCell className="font-medium">{day}</TableCell>
                          <TableCell>{Times[index]}:00</TableCell>
                          <TableCell className="text-right">
                            {Engagements[index]}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
