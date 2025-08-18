import AllBlogs from "@/components/AllBlog";

const Page = async () => {
  return (
    <div className=" bg-white py-5 w-full max-w-[1320px] mx-auto">
      <div className="mx-6 tab:mx-2 flex  flex-col gap-10 ">
        <AllBlogs />
      </div>
    </div>
  );
};

export default Page;
