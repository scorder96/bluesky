import { useEffect, useState } from "react";
import { Image, Repeat, Video } from "lucide-react";

interface Props {
  onPostChange: (text: string) => void;
  post: string;
}

export default function PostInput({ onPostChange, post }: Props) {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
  }, []);
  const [state, setstate] = useState<any>();
  // const [inputText, setInputText] = useState<string>("");

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
  return (
    <>
      {/* Input Field */}
      <textarea
        className="w-full h-24 outline-none"
        placeholder="What's happening?"
        value={post}
        onChange={(e) => onPostChange(e.target.value)}
        maxLength={maxLength}
      />
      <div className="mt-2 text-right text-sm">
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
      {/* Highlighted Preview */}
      <div className="grid grid-cols-6 space-x-4 mt-2 p-4 shadow rounded-lg">
        <img
          src={state?.profileData.avatar}
          alt="user avatar"
          height={50}
          width={50}
          className="rounded-full"
        />
        <p className="text-gray-800 whitespace-pre-wrap col-span-5">
          {highlightText(post)}
        </p>
      </div>
    </>
  );
}
