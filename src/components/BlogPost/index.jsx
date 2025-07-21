"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Uploader from "@/components/uploader";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const BlogPost = ({ accessToken }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [metaTitle, setmetaTitle] = useState("");
  const [metaDiscription, setmetaDiscription] = useState("");
  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", featuredImage);

      const imageResponse = await fetch(
        "https://backend.elderlycareplatform.com/api/v1/blogs/image",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const imageResult = await imageResponse.json();
      const imageUrl = imageResult?.data?.url;
      // Step 2: Prepare blog data with the uploaded image URL
      const blogData = {
        title,
        sub_title: subTitle,
        content,
        image: imageUrl,
        meta_title: metaTitle, // Include meta title
        meta_description: metaDiscription, // Include meta description
      };

      // Step 3: Post the blog data
      const blogResponse = await fetch(
        "https://backend.elderlycareplatform.com/api/v1/blogs",
        {
          method: "POST",
          body: JSON.stringify(blogData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );

      if (!blogResponse.ok) {
        throw new Error("Failed to post blog");
      }

      const blogResult = await blogResponse.json();
      toast.success("Successfully post the blog!");
      setTitle("");
      setSubtitle("");
      setContent("");
      setFeaturedImage(null);
      setImage(null);
      setmetaTitle("");
      setmetaDiscription("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file) => {
    setFeaturedImage(file);
  };
  return (
    <div>
      <div className="container mx-auto mt-10 p-6 max-w-3xl bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                style={{ border: "1px solid" }}
                type="text"
                className="w-full py-2 px-3 !border-slate-300 rounded-md"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subtitle *
              </label>
              <input
                style={{ border: "1px solid" }}
                type="text"
                className="w-full py-2 px-3 !border-slate-300 rounded-md"
                placeholder="subTitle"
                value={subTitle}
                onChange={(e) => setSubtitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content *
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              style={{
                minHeight: "200px",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
              }}
              className="mb-4"
            />
          </div>

          <div className="flex flex-col justify-between gap-5 items-start">
            {/* <div
              onClick={() => document?.getElementById("input-date").click()}
              className="w-1/2"
            >
              <label className="block text-sm font-medium text-gray-700">
                Published at
              </label>
              <input
                id="input-date"
                style={{ border: "1px solid" }}
                type="date"
                className="w-full py-2 px-3 mt-2 !border-slate-300 rounded-md"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </div> */}

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>

              <Uploader
                image={image}
                setImage={setImage}
                onFileChange={handleFileChange}
              />
            </div>
          </div>

          {/* Metadata title and description */}
          <div className="grid grid-cols-2 gap-5 mt-5">
            {/* Metadata title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Meta Title *
              </label>
              <input
                style={{ border: "1px solid" }}
                type="text"
                className="w-full py-2 px-3 !border-slate-300 rounded-md"
                placeholder="Meta Title"
                value={metaTitle}
                onChange={(e) => setmetaTitle(e.target.value)}
                required
              />
            </div>
            {/* Metadata description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Meta Description *
              </label>
              <input
                style={{ border: "1px solid" }}
                type="text"
                className="w-full py-2 px-3 !border-slate-300 rounded-md"
                placeholder="Meta Discription"
                value={metaDiscription}
                onChange={(e) => setmetaDiscription(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`px-4 py-2 rounded-md text-white font-semibold my-5 ${
              loading ? "bg-gray-600" : "bg-[#70B795]"
            }`}
          >
            Post Now
          </button>
        </form>
      </div>

      <style jsx>{`
        :global(.ql-container) {
          min-height: 200px;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;

// for commit
