import { Link, useNavigate, useNavigation } from "@remix-run/react";
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
  const navigation = useNavigation();
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
        navigate("/");
      }
    }
    setLoading(false);
  }
  return (
    <form onSubmit={signUp} className="w-96">
      <h1 className="text-2xl">Create a new account</h1>
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
      <Button className="w-full mt-8">
        {Loading ? <Loader2 className="animate-spin" /> : "Continue"}
      </Button>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to={"/sign-in"} className="text-blue-500 font-bold underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
