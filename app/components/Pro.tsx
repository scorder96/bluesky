import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import pb from "~/pocketbase";
import { useNavigate } from "@remix-run/react";

export default function Pro() {
  useEffect(() => {
    !pb.authStore.isValid && navigate("/sign-up");
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [Selected, setSelected] = useState(0);
  const [Loading, setLoading] = useState(false);
  function buttonStyler(buttonid: number) {
    if (buttonid == Selected) {
      return "w-full border-2 border-primary";
    } else {
      return "w-full";
    }
  }
  async function inititatePayment() {
    setLoading(true);
    const record = await pb
      .collection("payments")
      .create({ user: pb.authStore.record?.id });
    if (record) {
      if (Selected == 0) {
        window.open("https://www.paypal.com/ncp/payment/FHZKNJV7QFV8Q");
      } else {
        window.open("https://www.paypal.com/ncp/payment/EA69S4ZFM9KL8");
      }
    }
    setLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Work on multiple profiles</DialogTitle>
          <DialogDescription>
            Grow parallelly, compare data or track competitors with a pro
            account
          </DialogDescription>
        </DialogHeader>
        <h2 className="mt-4 font-semibold">Select your plan</h2>
        <div className="flex space-x-4">
          <Button
            variant={"outline"}
            className={buttonStyler(0)}
            onClick={() => setSelected(0)}
          >
            Monthly
          </Button>
          <Button
            variant={"outline"}
            className={buttonStyler(1)}
            onClick={() => setSelected(1)}
          >
            Annual
          </Button>
        </div>
        <h2 className="mt-4 font-semibold">What you get</h2>
        <ul className="[&>li]:flex space-y-2">
          <li>
            <Check className="text-primary" />
            &nbsp;Multiple profiles
          </li>
          <li>
            <Check className="text-primary" />
            &nbsp;Unlimited post scheduling
          </li>
          <li>
            <Check className="text-primary" />
            &nbsp;Weekly email reports
          </li>
          <li>
            <Check className="text-primary" />
            &nbsp;Priority support
          </li>
        </ul>
        <hr />
        <div className="flex justify-between items-end">
          <h2>
            ${" "}
            <span className="text-4xl font-bold">{Selected == 0 ? 9 : 99}</span>{" "}
            <span className="text-sm opacity-50">
              {Selected == 0 ? "/mo (billed monthly)" : "/year (billed yearly)"}
            </span>
          </h2>
          <Button onClick={inititatePayment}>
            {Loading ? (
              <>
                <Loader2 className="animate-spin" />
                Loading
              </>
            ) : (
              "Upgrade to Pro"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
