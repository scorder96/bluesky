import { Link, MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "The Ultimate Guide to Bluesky Growth" },
    {
      name: "description",
      content:
        "What is the best way to grow organically on this innovative platform? This article will break down all the methods and steps to grow organically on Bluesky.",
    },
  ];
};

export default function Grow() {
  return (
    <article className="m-8 md:m-16 me-8 col-span-4 md:col-span-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The Ultimate Guide to Bluesky Growth
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Bluesky is amazing. And it's growing. As of now, it has close to 30
        million users. It's a great time to get started on building a community
        on Bluesky. <br /> But what is the best way to grow organically on this
        innovative platform? This article will break down all the methods and
        steps to grow organically on Bluesky.
      </p>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        1. Optimize Your Profile
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Slow down there. Is your profile complete? Check if you have a bio
        (ideally with a link or two), a profile pic, and a banner. It's better
        if they all go well together.
        <br /> Make sure you have a few posts to start with, so when someone
        visits your profile, it looks professional and they can see what you're
        putting out.
      </p>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        2. Create Engaging Content
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The basics are not so far-off from{" "}
        <a
          href="https://x.com"
          target="_blank"
          className="text-primary hover:underline"
        >
          Twitter (X)
        </a>
        ,{" "}
        <a
          href="https://threads.net"
          target="_blank"
          className="text-primary hover:underline"
        >
          Threads
        </a>{" "}
        or any other social platform. <br /> <b>Good content always wins</b>.
        <br />
        Experiment with different types of posts to find out what resonates with
        your audience. Express your thoughts, share media and use polls to
        engage your audience. The more engagement your posts get, the more you
        will grow.
      </p>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        3. Consistency, Consistency, Consistency
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        I won't shy away from saying it a 100 more times. It is an incontestable
        fact that every social media algorithm out there LOVES consistency.
        Bluesky is not an exception. We analysed top performing profiles and all
        of them had this trait in common. <br /> Even if you are putting out
        subpar content, consistency ensures a higher chance of your posts
        getting more attention.
      </p>
      <br />
      <div className="text-lg font-semibold">
        Pro Tip:{" "}
        <Link to={"/"} className="text-primary hover:underline">
          Use our consistency tracker
        </Link>{" "}
        to see how well you're doing.
      </div>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        4. Engage - Like, Reply, Follow
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        You have to give to the platform before you can take from it. Engage
        with people in your niche or industry, follow them, like and reply on
        their posts. Be active. This will not only help grow your personal
        network, but other people will also notice you as an active member of
        the community.
      </p>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        5. Use Memes And Trends
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Humour goes a long way. People will love you if you can make them laugh.
        Post memes related to your niche to effectively connect with people in
        the community. Talk about and share your opinion on trendy topics that
        resonate with your audience. Using hashtags is a great help. They can
        provide greater visibility to your posts.
      </p>
      <br />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        To wrap it up, stay authentic.
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        If you're trying to be someone you're not, people will not resonate with
        you. Something will always feel off. There's no need to always be super
        professional. The greatest tip is to simply be yourself. Authenticity is
        always noticed, and appreciated. Especially if you're trying to build a
        personal brand.
      </p>
    </article>
  );
}
