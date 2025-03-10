import { Check, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@remix-run/react";
import pb from "~/pocketbase";
import { useState } from "react";

export default function Pricing() {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function initiatePayment() {
    setLoading(true);
    if (pb.authStore.isValid) {
      const record = await pb
        .collection("payments")
        .create({ user: pb.authStore.record?.id });
      window.open("https://www.paypal.com/ncp/payment/FHZKNJV7QFV8Q");
    } else {
      navigate("/sign-up");
    }
    setLoading(false);
  }
  return (
    <div className="p-8 shadow mt-8 rounded-md">
      <div>
        <span className="text-lg line-through opacity-50">$39</span>
        <span className="text-4xl font-bold ms-2">$9</span>
        <span className="ms-1 text-sm opacity-50">USD</span>
      </div>
      <ul className="[&>li]:flex mt-8 space-y-4">
        <li>
          <Check className="text-primary" />
          &nbsp;Advanced Insights
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Unlimited Profiles
        </li>
        <li>
          <Check className="text-primary" />
          &nbsp;Unlimited Scheduling
        </li>
      </ul>
      <Button
        size={"lg"}
        className="w-full mt-8 mb-4"
        onClick={initiatePayment}
      >
        {Loading ? (
          <>
            <Loader2 className="animate-spin" />
            Loading
          </>
        ) : (
          <>
            Get Bluestride{" "}
            <img src="/antennae.svg" alt="bluestride logo" className="h-3" />
          </>
        )}
      </Button>
      <p>
        One-time payment, then <u>it's yours forever</u>
      </p>
    </div>
  );
}
