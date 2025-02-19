import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="w-full p-8 border-t border-primary mt-16">
      <div className="grid grid-cols-3">
        <h1 className="md:text-2xl font-bold">
          <Link to={"/"}>SleekDash.</Link>
        </h1>
        <ul>
          <li className="hover:text-primary hover:underline">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-primary hover:underline">
            <Link to={"/"}>Dashboard</Link>
          </li>
          <li className="hover:text-primary hover:underline">
            <Link to={"/"}>Blog</Link>
          </li>
          <li className="hover:text-primary hover:underline">
            <Link to={"/"}>Account</Link>
          </li>
        </ul>
        <Link
          to={"https://bsky.app/profile/sleekdash.xyz"}
          target="_blank"
          className="hover:text-primary"
        >
          🦋 <u>Follow on Bluseky</u>
        </Link>
      </div>
      <p className="text-center mt-8">Copyright &copy; 2025 SleekDash</p>
    </footer>
  );
}
