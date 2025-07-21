import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeviceInfo from "@/components/SystemBuild/DeviceInfo";
import AddDevice from ".";

export default function PaymentPage() {
  const cookieStore = cookies();
  const stripeCustomerId = cookieStore.get("stripeCustomerId");
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    redirect("/login");
  }

  // if (!stripeCustomerId) {
  //   redirect("/");
  // }

  return (
    <div className="flex items-start justify-start">
      <AddDevice />
    </div>
  );
}
