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
  Flame,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Bsky SleekDash | Bluesky Profile Analytics" },
    {
      name: "description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking.",
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
      content: "Bsky SleekDash | Bluesky Profile Analytics",
    },
    {
      name: "og:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking.",
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
      content: "Bsky SleekDash | Bluesky Profile Analytics",
    },
    {
      name: "twitter:description",
      content:
        "Free analytics for your Bluesky profile. Engagement metrics and growth tracking.",
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
        <h1 className="text-6xl font-bold">
          Bluesky Profile{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-blue-400">
            Analytics
          </span>
        </h1>
        <h2 className="text-lg mt-4">Engagement metrics and Growth tracking</h2>
        <Form method="POST" className="mt-8 flex flex-col">
          <div className="flex items-center">
            <div className="h-10 w-10 flex justify-center items-center text-blue-500">
              @
            </div>
            <Input
              className="w-80 h-10"
              placeholder="handle.bsky.social"
              name="identifier"
            />
          </div>
          {data == false && (
            <div className="mt-4 text-red-500">Handle not found :(</div>
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
      <div className="grid md:grid-cols-4 gap-4 px-8 md:px-32">
        <div className="border-2 border-blue-500 flex justify-between hover:shadow-lg p-4">
          <h3 className="text-xl">Engagement</h3>
          <ChartNoAxesColumnIncreasing />
        </div>
        <div className="border-2 border-blue-500 flex justify-between hover:shadow-lg p-4">
          <h3 className="text-xl">Growth</h3>
          <TrendingUp />
        </div>
        <div className="border-2 border-blue-500 flex justify-between hover:shadow-lg p-4">
          <h3 className="text-xl">Consistency</h3>
          <Flame />
        </div>
        <div className="border-2 border-blue-500 flex justify-between hover:shadow-lg p-4">
          <h3 className="text-xl">Scheduling</h3>
          <Calendar />
        </div>
      </div>
      <div className="text-center mt-32 py-16 bg-gradient-to-b from-blue-200 to-white">
        <h2 className="text-4xl italic">
          " This is the BEST Bluesky analytics tool ever!! "
        </h2>
        <p className="mt-4">- Nobody</p>
      </div>
      <footer className="w-full p-8 grid grid-cols-3 border-t border-blue-500 mt-32">
        <h1 className="md:text-2xl font-bold">SleekDash.</h1>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Statistics</li>
          <li>Posts</li>
          <li>Schedule</li>
          <li>Account</li>
        </ul>
        <p>Copyright &copy; 2025 SleekDash</p>
      </footer>
    </>
  );
}
