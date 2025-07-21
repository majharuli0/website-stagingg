import { cookies } from "next/headers";
import SingleBlog from "@/components/AllBlog/SingleBlog";

export const dynamic = "force-dynamic"; // Optional: Ensures dynamic rendering

export async function generateMetadata({ params }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const API_URL = `https://backend.elderlycareplatform.com/api/v1/blogs/${params?.id}`;
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
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

export default function BlogDetails({ params }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  const fetchBlogs = () => {
    console.log("params", params);
  };

  fetchBlogs();
  return (
    <div className="bg-white py-5 w-full max-w-7xl mx-auto">
      <div className="mx-6 flex flex-col gap-10">
        <SingleBlog accessToken={accessToken} params={params} />
      </div>
    </div>
  );
}
