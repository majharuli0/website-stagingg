import Login from "@/components/Login";
import { getAuthCookies } from "@/utils/authCookies";
import { redirect } from 'next/navigation';


export default async function LoginPage() {
  const { accessToken } = await getAuthCookies();
  if (accessToken) {
    redirect("/account");
  }

  return (
    <div className="">
      {/* <RegisterImage /> */}
      <Login />
    </div>
  );
}
