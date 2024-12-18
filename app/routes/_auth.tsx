import { Outlet } from "@remix-run/react";
import React from "react";

export default function Auth() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
}
