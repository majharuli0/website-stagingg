import SingleBlog from "@/components/AllBlog/SingleBlog";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";

export async function generateMetadata({ params }) {
  const id = params.id;
  const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`;

  try {
    const response = await fetch(API_URL, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error("Failed to fetch blog metadata");
    }

    const blog = await response.json();

    return {
      title: blog.data.meta_title || "Blog Post",
      description: blog.data.meta_description || "Detailed blog post",
      openGraph: {
        title: blog.data.title,
        description: blog.data.description,
        images: [
          {
            url: blog.data.image,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error.message);
    return {
      title: "Blog Details",
      description: "Blog details page",
    };
  }
}

export default async function BlogDetails({ params }) {
  const id = params.id;
  const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${id}`;

  let blogData = null;
  let error = null;
  let loading = true;

  try {
    const response = await fetch(API_URL, {
      headers: { "Content-Type": "application/json" },
      cache: "force-cache", // Match cache strategy with generateMetadata if desired
    });
    if (!response.ok) {
      throw new Error("Failed to fetch blog data for page");
    }
    blogData = await response.json();
  } catch (err) {
    error = err.message || "Failed to fetch blog data";
  } finally {
    loading = false;
  }

  if (loading) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    );
  }

  if (error || !blogData?.data) {
    return (
      <div className="container flex justify-center items-center py-20">
        <NotFound title={"Blog not found"} />
      </div>
    );
  }

  return (
    <div className="bg-white py-5 w-full max-w-7xl mx-auto">
      <div className="mx-6 flex flex-col gap-10">
        <SingleBlog blog={blogData.data} />
      </div>
    </div>
  );
}
