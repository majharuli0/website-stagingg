import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Page from ".";

export default function PaymentPage() {
  const cookieStore = cookies();
  const stripeCustomerId = cookieStore.get("stripeCustomerId");
  const accessToken = cookieStore.get("access_token");

  if (accessToken) {
    redirect("/");
  }

  // if (!stripeCustomerId) {
  //   redirect("/sign-up");
  // }

  return <Page />;
}
