import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader2 } from "lucide-react";
import pb from "~/pocketbase";

export default function SignIn() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState(String);
  const [Password, setPassword] = useState(String);
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirectTo");

  async function signIn(event: FormEvent) {
    setError("");
    setLoading(true);
    event.preventDefault();
    await pb
      .collection("users")
      .authWithPassword(Email, Password)
      .catch((err) => setError(err.message));
    if (pb.authStore.isValid) {
      navigate("/profile");
    }
    setLoading(false);
  }
  async function googleAuth() {
    setLoading(true);
    const authData = await pb
      .collection("users")
      .authWithOAuth2({ provider: "google" })
      .catch((err) => console.log(err));
    if (pb.authStore.isValid) {
      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/account");
      }
    }
    setLoading(false);
  }
  return (
    <div>
      <form onSubmit={signIn} className="w-96">
        <h1 className="text-2xl font-bold">Log in to your account</h1>
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
        <Button variant={"secondary"} className="w-full mt-4">
          {Loading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>
      <p className="my-4 text-center opacity-50">or</p>
      <Button className="w-full" onClick={googleAuth}>
        <img
          src="/Google__G__logo.svg"
          alt="Google G logo"
          height={16}
          width={16}
        />
        Google Auth
      </Button>

      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to={"/sign-up"} className="text-primary font-bold underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
