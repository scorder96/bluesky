import { AtpAgent } from "@atproto/api";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import {
  Calendar,
  ChartNoAxesColumnIncreasing,
  Check,
  Flame,
  Loader2,
  TrendingUp,
} from "lucide-react";
import Reveal from "~/components/Reveal";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Bsky SleekDash | Bluesky Profile Analytics & Scheduling" },
    {
      name: "description",
      content:
        "Free tools for your Bluesky profile growth. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "og:url",
      content: "https://sleekdash.xyz",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:title",
      content: "Bsky SleekDash | Bluesky Profile Analytics & Scheduling",
    },
    {
      name: "og:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "og:image",
      content: "/sleekdash-rectangle.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:domain",
      content: "sleekdash.xyz",
    },
    {
      name: "twitter:url",
      content: "https://sleekdash.xyz",
    },
    {
      name: "twitter:title",
      content: "Bsky SleekDash | Bluesky Profile Analytics & Scheduling",
    },
    {
      name: "twitter:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "twitter:image",
      content: "/sleekdash-rectangle.png",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const id = formData.get("identifier");

  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  var did: string = "";
  const endpoint =
    "https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=" + id;
  const response = await fetch(endpoint);
  if (response.status == 200) {
    const jsonResponse = await response.json();
    did = jsonResponse.did;
    return redirect("/fetch/" + did);
  } else {
    return false;
  }
}

export default function Index() {
  const navigation = useNavigation();
  var data = useActionData<typeof action>();
  return (
    <>
      <nav className="shadow flex justify-between items-end px-8 py-4">
        <h1 className="text-xl">SleekDash</h1>
        <Link to={"account"}>
          <h2>Account</h2>
        </Link>
      </nav>
      <div className="flex flex-col items-center text-center h-screen pt-32">
        <Link to={"https://bsky.app/profile/sleekdash.xyz"} target="_blank">
          <button
            type="button"
            className="flex items-center bg-gradient-to-br from-slate-700 to-slate-800 text-white p-1 px-3 mb-4 rounded-full"
          >
            {/* <TwitterLogoIcon className="me-2" /> */}
            <span className="text-sm font-semibold">Follow on Bluesky</span>
          </button>
        </Link>
        <h1 className="text-5xl md:text-6xl font-bold">
          Grow on{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-400">
            Bluesky
          </span>
        </h1>
        <h2 className="text-lg mt-4">
          Insights, Growth Tracking, Post Scheduling and a pinch of Competitive
          Edge
        </h2>
        <Form method="POST" className="mt-8 flex flex-col">
          <div className="flex items-center">
            <div className="h-10 w-10 flex justify-center items-center text-primary">
              @
            </div>
            <Input
              className="w-80 h-10"
              placeholder="handle.bsky.social"
              name="identifier"
            />
          </div>
          {data == false && (
            <p className="mt-4 text-red-500">Handle not found :(</p>
          )}
          <Button className="mt-4">
            {navigation.state == "submitting" ||
            navigation.state == "loading" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </Form>
      </div>
      <Reveal>
        <div className="md:grid md:grid-cols-2 px-8 md:px-32">
          <div>
            <h2 className="text-4xl font-bold">Statistics that matter.</h2>
            <ul className="[&>li]:flex mt-8 space-y-4">
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
          <img
            src="/screenshot-1.png"
            alt="consistency graph screenshot"
            className="mt-16 md:mt-0"
          />
        </div>
      </Reveal>
      <Reveal>
        <div className="md:grid md:grid-cols-2 px-8 md:px-32 mt-32">
          <img
            src="/screenshot-2.png"
            alt="post scheduling screenshot"
            className="hidden md:block"
          />
          <div className="md:ps-32">
            <h2 className="text-4xl font-bold">Tools for growth.</h2>
            <p className="mt-8">
              Schedule upto an year worth of posts to keep up your consistency
              and grow on auto-pilot. ✈️
            </p>
            <p className="mt-4">We will manage the rest.</p>
          </div>
          <img
            src="/screenshot-2.png"
            alt="post scheduling screenshot"
            className="md:hidden mt-16"
          />
        </div>
      </Reveal>
      <Reveal>
        <div className="grid md:grid-cols-4 gap-4 px-8 md:px-32 mt-32">
          <div className="border-2 border-primary rounded-md flex justify-between hover:shadow-lg p-4">
            <h3 className="text-xl">Engagement</h3>
            <ChartNoAxesColumnIncreasing />
          </div>
          <div className="border-2 border-primary rounded-md flex justify-between hover:shadow-lg p-4">
            <h3 className="text-xl">Growth</h3>
            <TrendingUp />
          </div>
          <div className="border-2 border-primary rounded-md flex justify-between hover:shadow-lg p-4">
            <h3 className="text-xl">Consistency</h3>
            <Flame />
          </div>
          <div className="border-2 border-primary rounded-md flex justify-between hover:shadow-lg p-4">
            <h3 className="text-xl">Scheduling</h3>
            <Calendar />
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className="px-8 md:px-32 mt-32 md:columns-2">
          <h2 className="text-4xl font-bold">Profile reports, delivered.</h2>
          <p className="mt-8">
            No need to log in. We will send the important stuff to your inbox.
          </p>
          <img
            src="illustration.svg"
            alt="illustration of a man opening a letter"
            className="h-60 mx-auto mt-8"
          />
        </div>
      </Reveal>
      <div className="text-center mt-32 py-16">
        <h2 className="text-4xl italic font-bold text-primary">
          This is the BEST Bluesky analytics tool ever!
        </h2>
        <p className="mt-4">- Nobody</p>
      </div>
      <footer className="w-full p-8 border-t border-primary mt-32">
        <div className="grid grid-cols-3">
          <h1 className="md:text-2xl font-bold">SleekDash.</h1>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Statistics</li>
            <li>Posts</li>
            <li>Schedule</li>
            <li>Account</li>
          </ul>
          <Link to={"https://bsky.app/profile/sleekdash.xyz"} target="_blank">
            🦋 <u>Follow on Bluseky</u>
          </Link>
        </div>
        <p className="text-center mt-8">Copyright &copy; 2025 SleekDash</p>
      </footer>
    </>
  );
}
