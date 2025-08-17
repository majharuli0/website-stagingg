import { redirect } from "next/navigation";
import AccountInfo from "./accountInfo";
import { getAuthCookies } from "@/utils/authCookies";


export default async function ProfilePage() {
  const { accessToken } = await getAuthCookies();

  if (!accessToken) {
    redirect("/login");
  }

  return <AccountInfo />;
}
