import { Clock, Edit, Image, Loader2, Repeat, Video } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "./DatePicker";
import TimePicker from "./ui/TimePicker";
import pb from "~/pocketbase";

interface Props {
  onScheduled: () => void;
}
export function PostNew({ onScheduled }: Props) {
  const [Post, setPost] = useState(String);

  useEffect(() => {
    highlightContent();
  }, [Post, highlightContent]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [Time, setTime] = useState("09:00");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(String);
  const divRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  function jsonBuilder() {
    const now = new Date().toISOString().replace(/\+00:00$/, "Z");
    var defaultJson: any = {
      $type: "app.bsky.feed.post",
      text: Post,
      createdAt: now,
    };
    var byteStart;
    var byteEnd;
    var facets = [];
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    const did = data.profileData.did;
    for (let i = 0; i < Post.length; i++) {
      const letter = Post[i];
      if (letter == "#") {
        byteStart = i + 2;
        for (let j = i; j < Post.length; j++) {
          const endLetter = Post[j];
          if (endLetter == " ") {
            byteEnd = j + 2;
            const facetJson = {
              index: { byteStart: byteStart, byteEnd: byteEnd },
              features: [{ $type: "app.bsky.richtext.facet#tag", did: did }],
            };
            facets.push(facetJson);
            break;
          }
        }
      }
    }
    defaultJson.facets = facets;
    return defaultJson;
  }

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

    const data = {
      profile: profileRecord.id,
      post: jsonBuilder(),
      postAt: postDate.toISOString(),
    };

    const record = await pb.collection("schedule").create(data);
    if (record) {
      onScheduled();
    }
    setLoading(false);
  }

  function handleInput() {
    if (divRef.current) {
      const text = divRef.current.innerText;
      setPost(text);
    }
  }
  function highlightContent() {
    if (divRef.current) {
      const text = divRef.current.innerText;
      const html = text.replace(/(\S*#\S+)|(\S*@\S+)/g, (match) => {
        if (match.startsWith("#")) {
          return `<span class="text-blue-500">${match}</span>`;
        } else if (match.startsWith("@")) {
          return `<span class="text-purple-500">${match}</span>`;
        }
        return match;
      });
      divRef.current.innerHTML = html;

      // Move cursor to the end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
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
        {/* <Textarea
          placeholder="I'm feeling lucky today."
          onChange={(e) => setPost(e.target.value)}
          value={Post}
        /> */}
        <div
          ref={divRef}
          className="w-full min-h-[6rem] ps-0 p-2 text-lg border-none focus:outline-none bg-transparent overflow-auto"
          contentEditable
          onInput={handleInput}
          role="textbox"
          aria-multiline="true"
        >
          I'm feeling lucky today
        </div>

        <div className="flex space-x-4">
          <Image
            className="opacity-50 text-blue-500 cursor-not-allowed"
            size={20}
          />
          <Video
            className="opacity-50 text-blue-500 cursor-not-allowed"
            size={20}
          />
          <Repeat
            className="opacity-50 text-blue-500 cursor-not-allowed"
            size={20}
          />
        </div>
        <hr className="my-2" />
        {/* <DialogTitle className="mt-4">Schedule</DialogTitle> */}
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
