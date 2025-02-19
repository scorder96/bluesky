import { Link, Outlet } from "@remix-run/react";
import BlogSide from "~/components/BlogSide";
import Footer from "~/components/Footer";

export default function Blog() {
  return (
    <div>
      <nav className="shadow flex justify-between items-end px-8 py-4">
        <h1 className="text-xl font-semibold">
          <Link to={"/"}>SleekDash</Link>
        </h1>
        <Link to={"account"}>
          <h2>Account</h2>
        </Link>
      </nav>
      <main className="grid grid-cols-4">
        <Outlet />
        <aside className="hidden md:block p-4 pt-16">
          <BlogSide />
        </aside>
      </main>
      <Footer />
    </div>
  );
}
