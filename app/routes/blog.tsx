import { Link, Outlet } from "@remix-run/react";
import BlogSide from "~/components/BlogSide";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

export default function Blog() {
  return (
    <div>
      <Navbar />
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
