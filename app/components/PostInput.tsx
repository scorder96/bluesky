import { useEffect, useState } from "react";
import {
  Image,
  Loader2,
  Quote,
  Repeat,
  Reply,
  Smile,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import EmojiPicker from "./EmojiPicker";
// import PostQuote from "./PostQuote";
// import ReplyTo from "./ReplyTo";

interface Props {
  onPostChange: (text: string) => void;
  post: string;
  onWebEmbed: (title: string, description: string) => void;
}

export default function PostInput({ onPostChange, post, onWebEmbed }: Props) {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
  }, []);
  const [state, setstate] = useState<any>();
  const [Emojis, setEmojis] = useState(false);
  // const [Quoting, setQuoting] = useState(false);
  // const [QuotingURL, setQuotingURL] = useState(String);
  const [WebEmbed, setWebEmbed] = useState(false);
  const [WebEmbedJson, setWebEmbedJson] = useState(Object);
  const [EmbedLoading, setEmbedLoading] = useState(false);
  // const [inputText, setInputText] = useState<string>("");

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

  // Function to highlight hashtags, mentions, and links
  const highlightText = (text: string) => {
    // Regex patterns
    const hashtagRegex = /#\w+/g;
    const mentionRegex = /@\w+/g;
    const linkRegex = /https?:\/\/[^\s]+/g;

    // Split text into parts and apply highlighting
    return text.split(/(\s+)/).map((part, index) => {
      if (hashtagRegex.test(part)) {
        return (
          <span key={index} className="text-blue-500">
            {part}
          </span>
        );
      } else if (mentionRegex.test(part)) {
        return (
          <span key={index} className="text-green-500">
            {part}
          </span>
        );
      } else if (linkRegex.test(part)) {
        return (
          <span key={index} className="text-purple-500 underline">
            {part}
          </span>
        );
      } else {
        return part;
      }
    });
  };
  // Bluesky max character length
  const maxLength = 300;
  // Calculate remaining characters
  const remainingChars = maxLength - post.length;

  function inputImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Only allow image files
    input.style.display = "none";

    input.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement; // ✅ Cast event.target
      if (target.files && target.files.length > 0) {
        console.log(target.files[0]); // Pass selected file
      }
    });
    input.click();
  }
  async function getMetadataFromURL(url: string) {
    setEmbedLoading(true);
    const metaData = await fetch("https://api.linkpreview.net/?q=" + url, {
      headers: { "X-Linkpreview-Api-Key": "1a64974222906c945b81f324c8fea16f" },
    }).then((response) => response.json());
    setEmbedLoading(false);
    return metaData;
  }
  async function handleChange(text: string) {
    onPostChange(text);
    const linkRegex = /https?:\/\/[^\s]+/g;
    if (linkRegex.test(text)) {
      if (isWhitespaceChar(text[text.length - 1])) {
        if (!WebEmbed) {
          setWebEmbed(true);
          const matchedURL = text.match(linkRegex);
          const metadata = await getMetadataFromURL(matchedURL![0]);
          onWebEmbed(metadata.title, metadata.description);
          setWebEmbedJson(metadata);
        }
      }
    } else {
      setWebEmbed(false);
    }
  }

  return (
    <div>
      {/* Input Field */}
      <textarea
        className="w-full h-24 outline-none"
        placeholder="What's happening?"
        value={post}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={maxLength}
      />
      <div className="flex justify-between mt-2">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setEmojis(!Emojis)}
          >
            <Smile className="text-blue-500" />
          </Button>
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setQuoting(!Quoting)}
          >
            <Quote className="text-blue-500" />
          </Button> */}
          {/* <Button variant="outline" size="icon" onClick={inputImage}>
            <Image className="text-blue-500" />
          </Button> */}
        </div>
        <div className="text-sm">
          <span
            className={
              remainingChars == 0
                ? "text-red-500" // Red if over limit
                : remainingChars <= 20
                ? "text-yellow-500" // Yellow if close to limit
                : "text-gray-500" // Gray otherwise
            }
          >
            {remainingChars}
          </span>
          <span className="text-gray-500">/{maxLength}</span>
        </div>
      </div>
      {Emojis && (
        <EmojiPicker onSelection={(emoji) => onPostChange(post + emoji)} />
      )}
      {/* {Quoting && <PostQuote onChange={setQuotingURL} link={QuotingURL} />} */}
      {/* Highlighted Preview */}
      <div className="grid grid-cols-6 space-x-4 mt-2 p-4 shadow rounded-lg">
        <img
          src={state?.profileData.avatar}
          alt="user avatar"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="text-gray-800 whitespace-pre-wrap col-span-5">
          {highlightText(post)}
          <br />
          {WebEmbed && (
            <div className="bg-neutral-200 p-2 mt-2">
              {EmbedLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <p className="text-sm font-semibold">{WebEmbedJson.title}</p>
                  <p className="text-xs">
                    {WebEmbedJson.description?.slice(0, 30) + "..."}
                  </p>
                </>
              )}
              <Button
                variant="outline"
                size={"sm"}
                className="mt-2"
                onClick={() => {
                  onWebEmbed("no-embed", "no-embed");
                  setWebEmbed(false);
                }}
              >
                Remove Embed
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
