import BlogPost from "@/components/BlogPost";
import PageTitle from "@/components/dashboard/pageTitle";
import { jwtDecode } from "jwt-decode";
import { getAuthCookies } from "@/utils/authCookies";

const AddBlog = async () => {
  const { accessToken } = await getAuthCookies();

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
