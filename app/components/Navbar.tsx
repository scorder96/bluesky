import { Link } from "@remix-run/react";
import { LegacyRef, Ref } from "react";
import pb from "~/pocketbase";

interface Props {
  navRef?: LegacyRef<HTMLDivElement>;
}
export default function Navbar({ navRef }: Props) {
  return (
    <nav
      className="shadow flex justify-between items-end px-8 py-4"
      ref={navRef}
    >
      <h1 className="text-xl font-semibold">
        <Link to={"/"}>Bluestride</Link>
      </h1>
      <ul className="flex space-x-4">
        <li>
          <Link to={"/pricing"}>Pricing</Link>
        </li>
        {pb.authStore.isValid && (
          <li>
            <Link to={"/account"}>Account</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
