import { useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import pb from "~/pocketbase";

export default function Pro() {
  useEffect(() => {
    !pb.authStore.isValid && navigate("/sign-up");
  }, []);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function inititatePayment() {
    setLoading(true);
    const record = await pb
      .collection("payments")
      .create({ user: pb.authStore.record?.id });
    if (record) {
      window.open("https://www.paypal.com/ncp/payment/FHZKNJV7QFV8Q");
    }
    setLoading(false);
  }
  return (
    <div className="col-span-6 md:col-span-5 flex flex-col justify-center items-center">
      <h2 className="mb-8">This feature will be released VERY soon!</h2>
      <Card>
        <CardHeader>
          <CardTitle>🐦 Early Bird</CardTitle>
          <CardDescription>
            Price will be increased to approx. $39 after release.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-end space-x-2">
          <p className="text-4xl">$ 9.99</p>
          <span className="opacity-50">/month</span>
        </CardContent>
        <CardFooter>
          <Button onClick={inititatePayment}>
            {Loading ? <Loader2 className="animate-spin" /> : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
