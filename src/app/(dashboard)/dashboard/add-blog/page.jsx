import BlogPost from "@/components/BlogPost";
import PageTitle from "@/components/dashboard/pageTitle";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const AddBlog = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  // Decode and validate the token on the server
  let userData = accessToken ? jwtDecode(accessToken.value) : null;

  if (userData.role !== "super_admin") {
    redirect("/adminlogin");
  }
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Add Blog" />
      <BlogPost accessToken={accessToken} />
    </div>
  );
};

export default AddBlog;
