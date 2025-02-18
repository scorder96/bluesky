import { Link, useNavigate } from "@remix-run/react";
import { FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import pb from "~/pocketbase";
import { Loader2 } from "lucide-react";

// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();
//   const data = {
//     username: formData.get("name"),
//     email: formData.get("email"),
//     emailVisibility: true,
//     password: formData.get("password"),
//     passwordConfirm: formData.get("password"),
//   };
//   const record = await pb.collection("users").create(data);
//   if (record) {
//     const email = formData.get("email")?.toString();
//     const pw = formData.get("email")?.toString();
//     if (email && pw) {
//       const newrecord = await pb.collection("users").authWithPassword(email, pw);
//       if (newrecord && pb.authStore.isValid) {
//         return redirect("/dashboard/account/a");
//       }
//     }
//   }
// }

export default function SignUp() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState(String);
  const [Password, setPassword] = useState(String);
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  async function signUp(event: FormEvent) {
    setError("");
    setLoading(true);
    event.preventDefault();
    const data = {
      email: Email,
      emailVisibility: true,
      password: Password,
      passwordConfirm: Password,
    };
    const record = await pb
      .collection("users")
      .create(data)
      .catch((err) => setError(err.message));
    if (record) {
      await pb
        .collection("users")
        .authWithPassword(Email, Password)
        .catch((err) => setError(err.message));
      if (pb.authStore.isValid) {
        navigate("/verify");
      }
    }
    setLoading(false);
  }
  async function googleAuth() {
    setLoading(true);
    const authData = await pb
      .collection("users")
      .authWithOAuth2({ provider: "google" })
      .catch((err) => console.log(err.message));
    if (pb.authStore.isValid) {
      navigate("/");
    }
    setLoading(false);
  }
  return (
    <div>
      <form onSubmit={signUp} className="w-96">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <div className="mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
        </div>
        {Error && <p className="mt-4 text-red-500">{Error}</p>}
        <Button variant={"secondary"} className="w-full mt-4" onClick={signUp}>
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
        Already have an account?{" "}
        <Link to={"/sign-in"} className="text-primary font-bold underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
