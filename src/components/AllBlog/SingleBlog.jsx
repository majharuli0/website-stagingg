"use client";
import Image from "next/image";
import Link from "next/link";
import "./blogcontent.css";
import NotFound from "../common/NotFound";



// SingleBlog now accepts `blog` data directly as a prop
const SingleBlog = ({ blog }) => {
  // If blog data is not provided or is null/undefined, it means there was an issue fetching it
  // The parent component (page.jsx) should handle the loading and error states before rendering SingleBlog
  // However, for robustness, we can still show NotFound if `blog` is explicitly null/undefined here.
  // The `Loading` component should be handled by the parent `page.jsx` before `SingleBlog` is rendered.

  if (!blog) {
    // This case should ideally be handled by the parent component (BlogDetails in page.jsx)
    // which would return a 404 or error page if data fetching failed.
    // But as a fallback, if `blog` prop is unexpectedly empty, we can show NotFound.
    return (
      <div className="container flex justify-center items-center py-20">
        <NotFound title={"Blog not found"} />
      </div>
    );

  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };


  return (
    <div>
      <div className="flex justify-start py-3">
        <Link href="/">Home</Link>
        <span>&nbsp;/&nbsp;</span>
        <Link href="/blog">Blog</Link>
        <span>&nbsp;/&nbsp;</span>
        <Link
          className="font-semibold"
          href={`/blog/${blog?.title}/${blog?._id}`}
        >
          {blog?.title}
        </Link>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold py-3">{blog?.title}</h2>
        <p className="text-sm pb-4">{formatDate(blog?.created_at)}</p>
        {blog?.image && (
          <Image
            className="w-fit max-h-[60vh] mx-auto"
            src={blog?.image}
            height={500}
            width={800}
            alt=""
          />
        )}
        <div
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </div>
  );
};

export default SingleBlog;
