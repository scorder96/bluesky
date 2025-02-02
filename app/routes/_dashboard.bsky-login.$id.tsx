import { redirect, useNavigate, useParams } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import pb from "~/pocketbase";
// export const loader = async () => {
//   return redirect("/pro");
// };

export default function BskyLogin() {
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    setstate(data);
  }, []);
  const [state, setstate] = useState<any>();
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(String);
  const [Password, setPassword] = useState(String);
  const navigate = useNavigate();
  const params = useParams();

  async function bskySignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!pb.authStore.isValid) {
      navigate("/sign-up");
      return;
    }
    var jsonContent = {
      identifier: state?.profileData.handle,
      password: Password,
    };
    await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jsonContent),
    }).then((res) => {
      if (res.status == 401) {
        setError("Invalid password. Please try again.");
        setLoading(false);
      } else {
        updatePassword();
      }
    });
  }
  async function updatePassword() {
    await pb
      .collection("profiles")
      .update(params.id!, { password: Password })
      .then(() => navigate("/schedule"));
    setLoading(false);
  }
  return (
    <div className="col-span-6 md:col-span-5 flex flex-col justify-center items-center">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Log in to your Bluesky account</CardTitle>
          <CardDescription>
            We need this information to post on your behalf. You need to do this
            only once.
          </CardDescription>
        </CardHeader>
        <form onSubmit={bskySignIn}>
          <CardContent>
            <b className="text-blue-500">{state?.profileData.handle}</b>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
              ></Input>
            </div>
            {Error && <p className="mt-4 text-red-500">{Error}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              {Loading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <p className="mt-8 opacity-50">
        Your credentials are RSA encrypted. We cannot see them.
      </p>
    </div>
  );
}
