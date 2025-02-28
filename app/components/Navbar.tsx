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
      <Link to={"/"} className="flex items-center">
        <img
          src="/antennae-blue.svg"
          alt="bluestride logo"
          className="h-4 me-2"
        />
        <h1 className="text-xl font-semibold">Bluestride</h1>
      </Link>
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
