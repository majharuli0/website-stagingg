import Login from "@/components/Login";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) {
    redirect("/account");
  }

  return (
    <div className="">
      {/* <RegisterImage /> */}
      <Login />
    </div>
  );
}
