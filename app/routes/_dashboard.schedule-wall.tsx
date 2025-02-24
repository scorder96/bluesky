import { Link, useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import pb from "~/pocketbase";

export default function ScheduleWall() {
  useEffect(() => {
    if (pb.authStore.isValid) {
      checkPassword();
    }
  }, []);
  const navigate = useNavigate();

  async function checkPassword() {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    const record = await pb
      .collection("profiles")
      .getFirstListItem(`handle="${data.profileData.handle}"`)
      .then((record) => {
        if (record.password) {
          navigate("/schedule");
        } else {
          navigate("/bsky-login/" + record.id);
        }
      })
      .catch(() => {
        upload();
      });
  }
  async function upload() {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    const pbProfileData = {
      user: pb.authStore.record?.id,
      handle: data.profileData.handle,
      did: data.profileData.did,
    };
    const recordProfile = await pb.collection("profiles").create(pbProfileData);
    if (recordProfile) {
      navigate("/bsky-login/" + recordProfile.id);
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
