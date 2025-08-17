import { redirect } from "next/navigation";
import Page from ".";
import { cookies } from "next/headers";

export default async function PaymentPage() {
  // Access cookies through the cookies function
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const isLogin = accessToken ? true : false;

  if (isLogin) {
    redirect("/account");
  }

  return <Page />;
}
