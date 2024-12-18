import { Link, useNavigate, useNavigation } from "@remix-run/react";
import { FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader2 } from "lucide-react";
import pb from "~/pocketbase";

export default function SignIn() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [Email, setEmail] = useState(String);
  const [Password, setPassword] = useState(String);
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  async function signIn(event: FormEvent) {
    setError("");
    setLoading(true);
    event.preventDefault();
    await pb
      .collection("users")
      .authWithPassword(Email, Password)
      .catch((err) => setError(err.message));
    if (pb.authStore.isValid) {
      const record = await pb
        .collection("profiles")
        .getFirstListItem(`user.id="${pb.authStore.record?.id}"`);
      if (record) {
        navigate("/dashboard/profile/" + record.did);
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={signIn} className="w-96">
      <h1 className="text-2xl">Log in to your account</h1>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        ></Input>
      </div>
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
      <Button className="w-full mt-8">
        {Loading ? <Loader2 className="animate-spin" /> : "Continue"}
      </Button>
      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to={"/sign-up"} className="text-blue-500 font-bold underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
