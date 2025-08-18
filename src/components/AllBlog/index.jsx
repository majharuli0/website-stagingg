"use client";

import axios from "axios";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";

const blogCache = {};
const AllBlogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      const API_URL = "https://backend.elderlycareplatform.com/api/v1/blogs";

      // Check if blogs are already cached
      if (blogCache[API_URL]) {
        console.log("Serving from cache");
        setBlogs(blogCache[API_URL]?.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Cache the data
        blogCache[API_URL] = response.data;

        // Update state
        setBlogs(response.data?.data);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {

    return <div>  <Loading /> </div>

  }

  if (blogs?.data?.length < 1)
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-xl font-semibold">No blog found</p>
      </div>
    );
  if (error) return;
  <div className="w-[100vw] flex justify-center items-center py-20">
    <p className="text-xl font-semibold">Error: {error}</p>
  </div>;

  const slugify = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with dashes
      .replace(/[^\w-]+/g, ""); // Remove special characters
  };

  return (
    <div>
      {/* recent blog */}
      <div>
        <div className="flex justify-start py-3">
          <Link href="/">Home</Link>
          <span>&nbsp;/&nbsp;</span>
          <Link className="font-semibold" href="/blog">
            Blog
          </Link>
        </div>
        <h3 className="text-[1.7rem] font-semibold pb-5">Recent Blog Posts</h3>
        {/* cards */}
        <div className="flex md:flex-col justify-between items-center gap-5">
          {blogs.length !== 0 &&
            blogs?.slice(-2).map((blog) => (
              <div
                key={blog._id}
                className="flex justify-between gap-2 w-full h-[264px]"
              >
                <Image
                  className="w-[40%] h-auto max-h-[264px] object-cover"
                  src={blog?.image || ""}
                  height={300}
                  width={200}
                  alt={blog?.image}
                />
                <div className="w-[60%] p-3 tab:p-1 relative">
                  <p className="text-sm">{formatDate(blog?.created_at)}</p>
                  <h4 className="text-xl tab:text-lg tab:leading-5 sm:text-[15px] sm:leading-[17px] font-semibold py-3">
                    {blog?.title}
                  </h4>
                  <p className="tab:text-sm"> {blog?.sub_title}</p>
                  <Link
                    className="flex items-center text-primary pt-4 font-semibold absolute bottom-4"
                    href={`/blog/${slugify(blog?.title)}/${blog?._id}`}
                  >
                    <span> See More </span>
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* all blog post */}
      <div>
        <h3 className="text-[1.7rem] font-semibold mt-12 tab:mt-6 pb-5">
          All Blog Posts
        </h3>
        {/* cards */}
        <div className="grid grid-cols-3 tab:grid-cols-1 gap-x-6 gap-y-12">
          {blogs.length !== 0 &&
            blogs?.map((blog) => (
              <div
                key={blog._id}
                className="flex justify-center w-full h-[450px] relative"
              >
                <div className="h-full w-full">
                  <Image
                    className="w-full h-[200px] object-cover"
                    src={blog?.image || ""}
                    height={300}
                    width={200}
                    alt=""
                  />
                  <div className="p-3 md:p-2 w-full">
                    <p className="text-sm">{formatDate(blog?.created_at)}</p>
                    <h4 className="text-xl md:text-[16px] font-semibold py-3 md:leading-5">
                      {blog?.title}
                    </h4>
                    <p className="md:text-sm">
                      {blog?.sub_title?.slice(0, 100)}
                    </p>
                    <Link
                      className="flex items-center text-primary pt-4 font-semibold absolute bottom-3"
                      href={`/blog/${slugify(blog?.title)}/${blog?._id}`}
                    >
                      <span> See More </span>
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
