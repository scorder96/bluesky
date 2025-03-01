import { AtpAgent } from "@atproto/api";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { Check, Loader2, Star } from "lucide-react";
import { useRef } from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Pricing from "~/components/Pricing";
import Reveal from "~/components/Reveal";
import ScreenshotShowcase from "~/components/ScreenshotShowcase";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Bluestride | Bluesky Post Scheduling and Insights" },
    {
      name: "description",
      content:
        "Free tools for your Bluesky profile growth. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "og:url",
      content: "https://bluestride.xyz",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:title",
      content: "Bluestride | Bluesky Post Scheduling and Insights",
    },
    {
      name: "og:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "og:image",
      content: "/bluestride-rectangle.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:domain",
      content: "bluestride.xyz",
    },
    {
      name: "twitter:url",
      content: "https://bluestride.xyz",
    },
    {
      name: "twitter:title",
      content: "Bluestride | Bluesky Post Scheduling and Insights",
    },
    {
      name: "twitter:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking. Schedule your posts.",
    },
    {
      name: "twitter:image",
      content: "/bluestride-rectangle.png",
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
  const navRef = useRef<HTMLDivElement>(null);
  function scrollToTop() {
    navRef.current?.scrollIntoView();
  }
  return (
    <>
      <Navbar navRef={navRef} />
      <div className="flex flex-col items-center text-center h-dvh pt-32 px-8">
        <Link to={"https://bsky.app/profile/bluestride.xyz"} target="_blank">
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
          AI-enabled Post Scheduling and Insights
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
        <a
          href="https://www.producthunt.com/posts/bluestride?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bluestride"
          target="_blank"
          className="mt-16"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=929172&theme=light&t=1740827869750"
            alt="Bluestride - Scheduling&#0032;and&#0032;Analytics&#0032;for&#0032;Bluesky | Product Hunt"
            style={{ width: 250, height: 54 }}
            width="250"
            height="54"
          />
        </a>
      </div>
      <Reveal>
        <div className="px-8 md:px-32 text-center">
          <h2 className="text-4xl font-bold">No more posting and praying 🙏</h2>
          <div className="md:grid md:grid-cols-2 mt-16">
            <div className="text-left">
              <p>
                We don't just tell you what works—we make it happen. <br />
                <br />
                With data-driven insights and smart scheduling, you'll know
                exactly when your audience is active and ready to engage. <br />
                <br />
                Bluestride enables you to grow scientifically.🚀
              </p>
              <p className="mt-8">
                <span className="bg-primary/10">Bluesky 🤝 Bluestride</span>
              </p>
              {/* <div className="border-2 rounded border-primary/30 w-40 mt-2"></div> */}
            </div>
            <ScreenshotShowcase imgSrc="scrnsht-1.png" ySpace={20} />
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className="px-8 md:px-32 mt-32 text-center flex flex-col items-center">
          <div className="flex text-transparent">
            <Star fill="gold" />
            <Star fill="gold" />
            <Star fill="gold" />
            <Star fill="gold" />
            <Star fill="gold" />
          </div>
          <p className="mt-4 md:px-64">
            "Since using Bluestride, I've actually started seeing a pattern in
            what works. My posts are getting way more reach. Honestly, I don't
            think I could go back to regular posting now."
          </p>
          <p className="mt-4 font-bold">Vikrant Dubey on Bluesky</p>
        </div>
      </Reveal>
      <Reveal>
        <div className="md:grid md:grid-cols-2 px-8 md:px-32 mt-32">
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
          {/* <img
            src="/screenshot-1.png"
            alt="consistency graph screenshot"
            className="mt-16 md:mt-0"
          /> */}
          <ScreenshotShowcase imgSrc="scrnsht-3.png" ySpace={50} />
        </div>
      </Reveal>
      <Reveal>
        <div className="md:grid md:grid-cols-2 px-8 md:px-32 mt-32">
          {/* <img
            src="/screenshot-2.png"
            alt="post scheduling screenshot"
            className="hidden md:block"
          /> */}
          <div className="hidden md:block">
            <ScreenshotShowcase imgSrc="scrnsht-2.png" ySpace={20} />
          </div>
          <div className="md:ps-32">
            <h2 className="text-4xl font-bold">Tools for growth.</h2>
            <p className="mt-8">
              Schedule unlimited of posts to keep up your consistency and grow
              on auto-pilot. ✈️
            </p>
            <p className="mt-4">🤖 AI will write them for you.</p>
          </div>
          {/* <img
            src="/screenshot-2.png"
            alt="post scheduling screenshot"
            className="md:hidden mt-16"
          /> */}
          <div className="md:hidden">
            <ScreenshotShowcase imgSrc="scrnsht-2.png" ySpace={20} />
          </div>
        </div>
      </Reveal>
      {/* <Reveal>
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
      </Reveal> */}
      {/* <Reveal>
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
      </Reveal> */}
      <Reveal>
        <div className="px-8 md:px-32 mt-32 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center">
            Doesn't get better than this
          </h2>
          <Pricing />
        </div>
      </Reveal>
      <Reveal>
        <div className="px-8 md:px-32 mt-32 md:grid md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">
              Believe in the future of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-400">
                Bluesky
              </span>
              ?
            </h2>
            <p className="mt-8">
              Don't stand behind the crowd. Sign-up now to start growing.
            </p>
            <Button size={"lg"} className="mt-8" onClick={scrollToTop}>
              Get Started
            </Button>
          </div>
          <img
            src="Bluesky_Logo.svg"
            alt="bluesky logo"
            className="h-48 mx-auto -rotate-[0.25rad] mt-16 md:mt-0"
          />
        </div>
      </Reveal>
      {/* <div className="text-center md:px-32 mt-32 py-16">
        <h2 className="text-4xl italic font-bold text-primary">
          It takes 20 minutes to set up posts for the month, then I sit back and
          enjoy the engagement.
        </h2>
      </div> */}
      <Footer />
    </>
  );
}
