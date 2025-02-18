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
  }, [Post]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [Time, setTime] = useState("09:00");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(String);
  const divRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  const isWhitespaceChar = (char: string) => {
    return (
      char === " " ||
      char === "\t" ||
      char === "\n" ||
      char === "\r" ||
      char === "\f" ||
      char === " "
    );
  };
  function isValidUrl(urlString: string) {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  }

  async function jsonBuilder() {
    const splittedPost = Post.split(/\s/);
    const urlRegex =
      /^(https?:\/\/|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?#][^\s]*)?$/i;
    const now = new Date().toISOString().replace(/\+00:00$/, "Z");
    var defaultJson: any = {
      $type: "app.bsky.feed.post",
      text: Post,
      createdAt: now,
    };
    var bytestart = 0;
    var byteend = 0;
    var facets = [];

    for (let i = 0; i < splittedPost.length; i++) {
      if (splittedPost[i][0] == "#") {
        byteend = bytestart + new Blob([splittedPost[i]]).size;
        const facetJson = {
          index: { byteStart: bytestart, byteEnd: byteend },
          features: [
            {
              $type: "app.bsky.richtext.facet#tag",
              tag: splittedPost[i].slice(1),
            },
          ],
        };
        facets.push(facetJson);
      } else if (splittedPost[i][0] == "@") {
        byteend = bytestart + new Blob([splittedPost[i]]).size;
        const endpoint =
          "https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=" +
          splittedPost[i].slice(1);
        const response = await fetch(endpoint);
        var did = "";
        if (response.status == 200) {
          const jsonResponse = await response.json();
          did = jsonResponse.did;
        }
        const facetJson = {
          index: { byteStart: bytestart, byteEnd: byteend },
          features: [
            {
              $type: "app.bsky.richtext.facet#mention",
              did: did,
            },
          ],
        };
        facets.push(facetJson);
      } else if (urlRegex.test(splittedPost[i])) {
        byteend = bytestart + new Blob([splittedPost[i]]).size;
        const facetJson = {
          index: { byteStart: bytestart, byteEnd: byteend },
          features: [
            {
              $type: "app.bsky.richtext.facet#link",
              uri: splittedPost[i],
            },
          ],
        };
        facets.push(facetJson);
      }
      bytestart += new Blob([splittedPost[i]]).size + 1;
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
      post: await jsonBuilder(),
      postAt: postDate.toISOString(),
    };
    // console.log(data);

    const record = await pb.collection("schedule").create(data);
    if (record) {
      onScheduled();
    }
    setLoading(false);
  }

  function handleInput() {
    if (divRef.current) {
      let text = divRef.current.innerText;
      text = text.replace(/\u00A0/g, " ");
      setPost(text);
    }
  }
  function highlightContent() {
    if (divRef.current) {
      const text = divRef.current.innerText;

      const hashtagRegex = /(\S*#\S+)/g;
      const mentionRegex = /(\S*@\S+)/g;
      const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/gi;

      let html = text
        .replace(urlRegex, (match) => {
          return `<span class="text-blue-500">${match}</span>`;
        })
        .replace(hashtagRegex, (match) => {
          return `<span class="text-blue-500">${match}</span>`;
        })
        .replace(mentionRegex, (match) => {
          return `<span class="text-purple-500">${match}</span>`;
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
        />

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
