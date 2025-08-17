import AdminLogin from "@/components/Login/AdminLogin";
import { getAuthCookies } from "@/utils/authCookies";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";


const page = async () => {
  const { accessToken } = await getAuthCookies();
  
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
