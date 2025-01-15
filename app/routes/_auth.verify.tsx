import { useNavigate } from "@remix-run/react";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import pb from "~/pocketbase";

export default function Verify() {
  useEffect(() => {
    sendVerif();
  }, []);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(String);
  const navigate = useNavigate();

  async function sendVerif() {
    await pb
      .collection("users")
      .requestVerification(pb.authStore.record?.email);
    //   .catch((err) => setError(err.message));
  }
  async function verify() {
    setError("");
    setLoading(true);
    const user = await pb
      .collection("users")
      .getOne(pb.authStore.record?.id!)
      .catch((err) => setError(err.message));
    setLoading(false);
    if (user?.verified) {
      navigate("/");
    } else {
      setError("Please check again");
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Verify your Email</h1>
      <p className="mt-4">We have sent you a mail to verify your account.</p>
      <p>If you can't find the mail, check spam.</p>
      <Button className="mt-4" onClick={verify}>
        {Loading ? <Loader2 className="animate-spin" /> : "I have verified"}
      </Button>
      {Error && (
        <p className="mt-4 text-red-500 flex">
          <TriangleAlert className="me-2" /> {Error}
        </p>
      )}
    </div>
  );
}
