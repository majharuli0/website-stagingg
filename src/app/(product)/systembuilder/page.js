import { redirect } from "next/navigation";
import Page from ".";
import { getAuthCookies } from "@/utils/authCookies";


export default async function PaymentPage() {
const { accessToken, stripeCustomerId } = await getAuthCookies();

  if (accessToken) {
    redirect("/account");
  }

  // if (!stripeCustomerId) {
  //   redirect("/");
  // }

  return <Page />;
}
