import { redirect } from "next/navigation";
import Page from ".";
import { getAuthCookies } from "@/utils/authCookies";


export default async function PaymentPage() {
  const { accessToken } = await getAuthCookies();


  if (!accessToken) {
    redirect("/");
  }

  // if (!stripeCustomerId) {
  //   redirect("/");
  // }

  return <Page />;
}
