"use client";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Uploader from "../uploader";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditBlog = ({ accessToken, setSidebarOpen, data, updateBlog }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
    setContent(data?.content);
    setTitle(data?.title);
    setSubtitle(data?.sub_title);
    setImage(data?.image);
  }, [data]);
  const handleFileChange = (file) => {
    setFeaturedImage(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      let imageUrl = image;
      if (featuredImage) {
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
        imageUrl = imageResult?.data?.url;
      }

      const blogData = {
        title,
        sub_title: subTitle,
        content,
        image: imageUrl,
      };

      const blogResponse = await fetch(
        `https://backend.elderlycareplatform.com/api/v1/blogs/${data._id}`,
        {
          method: "PUT",
          body: JSON.stringify(blogData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      );

      if (!blogResponse.ok) {
        throw new Error("Failed to update blog");
      }

      const blogResult = await blogResponse.json();
      updateBlog(blogResult.data);

      toast.success("Successfully updated the blog!");
      setSidebarOpen(false);
    } catch (error) {
      toast.error("An error occurred while updating the blog.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-[#000] opacity-40 z-40 backdrop-blur-xl"></div>
      <div
        className={`fixed top-0 right-0 z-50 md:w-[28] lg:w-[32rem] sm:w-[22rem] h-screen overflow-y-scroll scrollbar-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300`}
      >
        {/* Your sidebar content goes here */}
        <div className="sticky top-0 h-[70px] z-40 flex  justify-between items-start px-3 bg-slate-100 dark:bg-slate-600 py-5">
          <h1 className="text-xl font-semibold pl-5">Update Blog</h1>

          <div className="w-1/6 flex justify-end">
            <button
              onClick={() => setSidebarOpen(false)}
              className="bg-red-200  p-3 text-black h-8 w-8 rounded-full flex justify-center items-center shadow-lg font-semibold"
            >
              X
            </button>
          </div>
        </div>

        {/* form */}
        <div style={{ minHeight: `calc(100vh - 145px)` }} className="px-5">
          <div className="flex flex-col justify-between gap-5 items-start py-4">
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
        </div>

        {/* footer */}
        <div className="sticky bottom-0 h-[75px] z-40 px-8 flex gap-5 py-4  justify-between items-center bg-slate-100 dark:bg-slate-600">
          <div
            onClick={() => setSidebarOpen(false)}
            className="bg-[#EF4444]  font-semibold rounded-md  text-white"
          >
            <button className="hover:bg-black px-7 rounded-md py-2 hover:bg-opacity-30">
              Cancel
            </button>
          </div>
          <span
            onClick={() => handleUpdate()}
            className="bg-primary dark:bg-slate-200 font-semibold rounded-md dark:text-black text-white"
          >
            <button className="hover:bg-black px-7 rounded-md py-2 hover:bg-opacity-30">
              Update
            </button>
          </span>
        </div>
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

export default EditBlog;
