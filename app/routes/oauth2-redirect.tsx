import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useParams } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const queryCode = url.searchParams.get("code");
  const queryScope = url.searchParams.get("scope");
  const queryState = url.searchParams.get("state");
  console.log(queryCode, queryScope, queryState);
  return redirect(
    `https://unnrr.pocketcloud.xyz/api/oauth2-redirect?code=${queryCode}&scope=${queryScope}&state=${queryState}`
  );
}
