import AdminLogin from "@/components/Login/AdminLogin";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  let userData = accessToken ? jwtDecode(accessToken.value) : null;

  if (userData?.role == "super_admin") {
    redirect("/dashboard");
  }
  return (
    <div className="flex w-full items-center bg-white md:flex-col">
      {/* <RegisterImage /> */}
      <AdminLogin />
    </div>
  );
};

export default page;
