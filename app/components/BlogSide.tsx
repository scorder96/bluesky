import { BarChart, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@remix-run/react";

export default function BlogSide() {
  return (
    <div className="border-2 border-primary p-8">
      <h1 className="text-xl font-bold flex items-center">
        <BarChart className="me-2 text-primary" /> Grow on Bluesky
      </h1>
      <p className="mt-6">
        Insights, Growth Tracking, Post Scheduling and a pinch of Competitive
        Edge
      </p>
      <Button className="mt-6 w-full" asChild>
        <Link to={"/"}>Check it out</Link>
      </Button>
      <ul className="[&>li]:flex mt-8 space-y-4">
        <li>
          <Check className="text-primary" />
          &nbsp;Post Scheduling
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Consistency streaks
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Growth over time
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Deeper engagement tracking
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Best performing posts
        </li>
      </ul>
    </div>
  );
}
