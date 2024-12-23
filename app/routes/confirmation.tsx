import { Link } from "@remix-run/react";
import { Check } from "lucide-react";
import React from "react";

export default function Confirmation() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Check size={64} color="green" />
      <p className="mt-8 font-bold">Thank You</p>
      <p>You will be notified with updates shortly</p>
      <p className="mt-8">
        Support email - <i>scorder96@gmail.com</i>
      </p>
      <Link to={"/"} className="text-blue-500 font-bold mt-8">
        Back to Home
      </Link>
    </div>
  );
}
