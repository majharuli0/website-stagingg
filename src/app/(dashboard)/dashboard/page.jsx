// This should be in a server component or a middleware
import BlogTable from "@/components/dashboard/BlogTable";
import PageTitle from "@/components/dashboard/pageTitle";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { getAuthCookies } from "@/utils/authCookies";

export default async function Home() {
  const { accessToken } = await getAuthCookies();

  // Decode and validate the token on the server
  let userData = accessToken ? jwtDecode(accessToken.value) : null;

  if (userData?.role !== "super_admin") {
    redirect("/adminlogin");
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <div>
        <BlogTable accessToken={accessToken} />
      </div>
    </div>
  );
}
