import AllBlogs from "@/components/AllBlog";
import { getAuthCookies } from "@/utils/authCookies";

const Page = async () => {
  const { accessToken } = await getAuthCookies()
  
  return (
    <div className=" bg-white py-5 w-full max-w-[1320px] mx-auto">
      <div className="mx-6 tab:mx-2 flex  flex-col gap-10 ">
        <AllBlogs accessToken={accessToken} />
      </div>
    </div>
  );
};

export default Page;
