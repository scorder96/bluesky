import { Link, useNavigate } from "@remix-run/react";
import { Headphones, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import pb from "~/pocketbase";

export default function Account() {
  useEffect(() => {
    !pb.authStore.isValid && navigate("/sign-in");
  }, []);
  const navigate = useNavigate();
  const [Support, setSupport] = useState(false);
  return (
    <div className="col-span-5 flex flex-col justify-center items-center">
      You are logged in as <b>{pb.authStore.record?.email}</b>
      <div className="space-x-4 flex items-center mt-8">
        <Button
          variant={"destructive"}
          onClick={() => {
            pb.authStore.clear();
            navigate("/");
          }}
        >
          <LogOut />
          Sign Out
        </Button>
        <Button variant={"secondary"} onClick={() => setSupport(true)}>
          <Headphones />
          Support
        </Button>
      </div>
      {Support && (
        <p className="mt-8">
          <u>Support Email</u> -{" "}
          <Link to={"mailto:scorder96@gmail.com"}>
            <i>scorder96@gmail.com</i>
          </Link>
        </p>
      )}
    </div>
  );
}
