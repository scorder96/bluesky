import {
  isProfileViewDetailed,
  ProfileView,
  ProfileViewBasic,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { useState } from "react";
import pb from "~/pocketbase";

export default function useGlobalState() {
  const [avatar, setavatar] = useState(String);
  const [banner, setbanner] = useState(String);
  const [did, setdid] = useState(String);
  const [handle, sethandle] = useState(String);
  const [followers, setfollowers] = useState(Number);
  const [follows, setfollows] = useState(Number);
  const [pposts, setpposts] = useState(Number);
  const [displayname, setdisplayname] = useState(String);
  const [desc, setdesc] = useState(String);
  const [posts, setposts] = useState(Number);
  const [tReplies, settReplies] = useState(Number);
  const [tReposts, settReposts] = useState(Number);
  const [tQuotes, settQuotes] = useState(Number);
  const [tLikes, settLikes] = useState(Number);
  const [dateArray, setdateArray] = useState(Array<Number>);
  async function saveState(
    profileavatar: string,
    profilebanner: string,
    profiledid: string,
    profilehandle: string,
    profilefollowers: number,
    profilefollows: number,
    profileposts: number,
    profiledisplayname: string,
    profiledesc: string,
    posts: number,
    replies: number,
    reposts: number,
    quotes: number,
    likes: number,
    dateArray: Array<number>
  ) {
    console.log("savestate running" + profilehandle);

    setbanner(profilebanner);
    setavatar(profileavatar);
    setdid(profiledid);
    sethandle(profilehandle);
    setfollowers(profilefollowers);
    setfollows(profilefollows);
    setpposts(profileposts);
    setdisplayname(profiledisplayname);
    setdesc(profiledesc);
    setposts(posts);
    settReplies(replies);
    settReposts(reposts);
    settQuotes(quotes);
    settLikes(likes);
    setdateArray(dateArray);
  }
  console.log(handle);

  return {
    saveState,
    banner,
    avatar,
    did,
    handle,
    followers,
    follows,
    pposts,
    displayname,
    desc,
    posts,
    tReplies,
    tReposts,
    tQuotes,
    tLikes,
    dateArray,
  };
}
