import AllBlogs from "@/components/AllBlog";
import { cookies } from "next/headers";

const Page = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  return (
    <div className=" bg-white py-5 w-full max-w-[1320px] mx-auto">
      <div className="mx-6 tab:mx-2 flex  flex-col gap-10 ">
        <AllBlogs accessToken={accessToken} />
      </div>
    </div>
  );
};

export default Page;
