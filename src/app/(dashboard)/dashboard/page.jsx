// This should be in a server component or a middleware
import BlogTable from "@/components/dashboard/BlogTable";
import PageTitle from "@/components/dashboard/pageTitle";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

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
