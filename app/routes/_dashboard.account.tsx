import { Link, useNavigate, useRouteError } from "@remix-run/react";
import { Headphones, Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import pb from "~/pocketbase";

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="col-span-5 flex flex-col justify-center items-center">
      <h2>There was an unexpected error</h2>
      <p className="text-sm mt-4">Please refresh or try fetching again.</p>
      <p className="text-sm">
        Support email -<u>scorder96@gmail.com</u>
      </p>
    </div>
  );
}

export default function Account() {
  const navigate = useNavigate();
  const [Support, setSupport] = useState(false);
  const [Feedback, setFeedback] = useState(String);
  const [SuccessMessage, setSuccessMessage] = useState(String);
  const [Loading, setLoading] = useState(false);
  async function sendFeedback() {
    setLoading(true);
    const data = {
      message: Feedback,
    };
    const record = await pb.collection("feedback").create(data);
    if (record) {
      setSuccessMessage("Your feedback was recieved.");
    }
    setLoading(false);
  }
  return (
    <div className="col-span-6 md:col-span-5 px-6 py-8">
      {pb.authStore.isValid ? (
        <>
          <h2 className="text-2xl mb-8">
            Hello, <b>{pb.authStore.record?.email}</b>
          </h2>
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="Write your feedback here..."
            className="w-1/2"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
            value={Feedback}
          />
          <Button className="mt-4" onClick={sendFeedback}>
            {Loading ? <Loader2 className="animate-spin" /> : "Send"}
          </Button>
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
          {SuccessMessage && <p className="mt-4">{SuccessMessage}</p>}
        </>
      ) : (
        <>
          <p>You are not signed in</p>
          <Button className="mt-4" asChild>
            <Link to={"/sign-in"}>Sign In</Link>
          </Button>
        </>
      )}
    </div>
  );
}
