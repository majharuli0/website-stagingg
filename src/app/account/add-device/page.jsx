import { redirect } from "next/navigation";
import AddDevice from ".";
import { getAuthCookies } from "@/utils/authCookies";


export default async function PaymentPage() {
  const { accessToken } = await getAuthCookies();

  if (!accessToken) {
    redirect("/login");
  }

  // if (!stripeCustomerId) {
  //   redirect("/");
  // }

  return (
    <div className="w-full ">
      <AddDevice />
    </div>
  );
}
