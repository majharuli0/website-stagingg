import { redirect } from "next/navigation";
import AccountInfo from "./accountInfo";
import Cookies from "js-cookie";

export default function ProfilePage() {
  return <AccountInfo />;
}
