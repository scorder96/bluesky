import { useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import pb from "~/pocketbase";

export default function ScheduleWall() {
  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate("sign-up");
      return;
    }
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    checkPassword(data.profileData.handle);
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
    <div className="col-span-6 md:col-span-5 flex justify-center items-center">
      <Loader2 className="animate-spin text-primary" />
    </div>
  );
}
