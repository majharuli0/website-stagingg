import { redirect } from "next/navigation";
import Page from ".";
import { getAuthCookies } from "@/utils/authCookies";
import { cookies } from "next/headers";
export default async function PaymentPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    redirect("/");
  }

  // if (!stripeCustomerId) {
  //   redirect("/");
  // }

  return <Page />;
}
