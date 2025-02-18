import { Link, Outlet } from "@remix-run/react";

export default function Blog() {
  return (
    <div>
      <nav className="shadow flex justify-between items-end px-8 py-4">
        <h1 className="text-xl">SleekDash</h1>
        <Link to={"account"}>
          <h2>Account</h2>
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
