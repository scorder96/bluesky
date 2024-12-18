import { Link, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { Headphones } from "lucide-react";
import PocketBase from "pocketbase";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import pb from "~/pocketbase";

export default function Account() {
  useEffect(() => {
    !pb.authStore.isValid && navigate("/");
  }, []);
  const navigate = useNavigate();
  return (
    <div className="col-span-5 flex flex-col justify-center items-center">
      {pb.authStore.record?.email}
      <div className="space-x-4 flex items-center">
        <Button
          variant={"destructive"}
          className="mt-8"
          onClick={() => {
            pb.authStore.clear();
            navigate("/");
          }}
        >
          Sign Out
        </Button>
        <Button variant={"secondary"} className="mt-8" asChild>
          <Link to={"mailto:scorder96@gmail.com"}>
            <Headphones />
            Support
          </Link>
        </Button>
      </div>
    </div>
  );
}
