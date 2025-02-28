import { useEffect, useState } from "react";
import {
  Image,
  Loader2,
  Quote,
  Repeat,
  Reply,
  Smile,
  Sparkles,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import EmojiPicker from "./EmojiPicker";
import EmbedWeb from "./EmbedWeb";
import EmbedImage from "./EmbedImage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import useSort from "~/hooks/useSort";
// import PostQuote from "./PostQuote";
// import ReplyTo from "./ReplyTo";

interface Props {
  onPostChange: (text: string) => void;
  post: string;
  onWebEmbed: (title: string, description: string) => void;
  onImageEmbed: (json: any) => void;
}

export default function PostInput({
  onPostChange,
  post,
  onWebEmbed,
  onImageEmbed,
}: Props) {
  const [ImageEmbed, setImageEmbed] = useState(false);
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
    if (ImageEmbed == true) {
      onWebEmbed("no-embed", "no-embed");
      setWebEmbed(false);
    }
  }, [ImageEmbed]);
  const [state, setstate] = useState<any>();
  const [Emojis, setEmojis] = useState(false);
  // const [Quoting, setQuoting] = useState(false);
  // const [QuotingURL, setQuotingURL] = useState(String);
  const [WebEmbed, setWebEmbed] = useState(false);
  const [WebEmbedJson, setWebEmbedJson] = useState(Object);
  const [EmbedLoading, setEmbedLoading] = useState(false);
  const [ImageEmbedFile, setImageEmbedFile] = useState<File>();
  const [Generate, setGenerate] = useState(false);
  const [GeneratedPosts, setGeneratedPosts] = useState<any>();
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
        setImageEmbed(true);
        setImageEmbedFile(target.files[0]);
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
    if (linkRegex.test(text) && !ImageEmbed) {
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
  async function generatePost() {
    if (GeneratedPosts) {
      setGeneratedPosts(undefined);
      return;
    }
    setGenerate(true);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction:
        "You write Bluesky posts. I'll give you the profile information and top performing posts. You will generate 3 posts that will get the highest engagement and reach for the profile.",
    });
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    const sort = useSort();
    const sorted = sort.sortEngagement(data.feedData).reverse();
    const prompt = `Name: "${data.profileData.displayName}" Bio:"${data.profileData.description}" Top performing posts: 1."${sorted[0]}" 2."${sorted[1]}" 3."${sorted[2]}"`;
    const result = await model.generateContent(prompt);
    const jsonversion = JSON.parse(result.response.text());
    setGeneratedPosts(jsonversion.posts);
    // setGeneratedPosts([
    //   {
    //     text: "Just shipped a small but important update to [Product Name] that improves [specific feature].  What small features have made a big difference for you? #IndieHacking #SaaS #SoftwareDev",
    //     image: null,
    //   },
    //   {
    //     text: "Hit a milestone today! 🎉 [Specific achievement related to 1k MRR goal].  What are your biggest challenges in building a SaaS business? Let's chat! #IndieHacker #SaaSCo #Growth",
    //     image: null,
    //   },
    //   {
    //     text: "Excited to share I'm attending [Event Name]!  Looking forward to connecting with fellow indie hackers and learning from the best. Who else will be there? #IndieHackers #Networking #SaaSCommunity",
    //     image: null,
    //   },
    // ]);
    // setGeneratedPosts(undefined);
    setGenerate(false);
  }
  return (
    <div>
      {/* Input Field */}
      <textarea
        className="w-full h-24 outline-none bg-white"
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
          <Button variant="outline" size="icon" onClick={inputImage}>
            <Image className="text-blue-500" />
          </Button>
          <Button variant={"secondary"} onClick={generatePost}>
            {Generate ? (
              <>
                <Loader2 className="animate-spin text-primary" /> Writing
              </>
            ) : (
              <>
                <Sparkles className="text-primary" /> Write
              </>
            )}
          </Button>
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
      {GeneratedPosts && (
        <div className="absolute shadow bg-white rounded-md p-4">
          {GeneratedPosts.map((post: any) => {
            return (
              <p
                className="p-2 text-sm hover:bg-neutral-100 cursor-pointer"
                onClick={() => {
                  onPostChange(post.text);
                }}
              >
                {post.text}
              </p>
            );
          })}
        </div>
      )}

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
          {ImageEmbed && (
            <EmbedImage
              file={ImageEmbedFile!}
              onEmbedJson={onImageEmbed}
              onRemove={() => {
                setImageEmbed(false);
              }}
            />
          )}
          {WebEmbed && (
            <EmbedWeb
              loading={EmbedLoading}
              embedJson={WebEmbedJson}
              onRemoveEmbed={() => {
                onWebEmbed("no-embed", "no-embed");
                setWebEmbed(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
