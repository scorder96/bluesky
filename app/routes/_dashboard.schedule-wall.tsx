import { Link, useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import pb from "~/pocketbase";

export default function ScheduleWall() {
  useEffect(() => {
    if (pb.authStore.isValid) {
      const dataOrg = localStorage.getItem("ALLDATA");
      const data = JSON.parse(dataOrg!);
      checkPassword(data.profileData.handle);
    }
  }, []);
  const navigate = useNavigate();
  async function checkPassword(handle: string) {
    const record = await pb
      .collection("profiles")
      .getFirstListItem(`handle="${handle}"`);
    if (record.password) {
      navigate("/schedule");
    } else {
      navigate("/bsky-login/" + record.id);
    }
  }
  return (
    <div className="col-span-6 md:col-span-5 flex flex-col justify-center items-center">
      {pb.authStore.isValid ? (
        <Loader2 className="animate-spin text-primary" />
      ) : (
        <>
          <p>You are not signed in</p>
          <Button className="mt-4" asChild>
            <Link to={"/sign-in?redirectTo=/schedule-wall"}>Sign In</Link>
          </Button>
        </>
      )}
    </div>
  );
}
