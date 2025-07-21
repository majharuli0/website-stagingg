"use client";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditBlog from "./EditBlog";
const BlogTable = ({ accessToken }) => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      const API_URL = "https://backend.elderlycareplatform.com/api/v1/blogs";

      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken?.value}`,
          },
        });

        // Update state
        setBlogs(response?.data?.data);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const API_URL = `https://backend.elderlycareplatform.com/api/v1/blogs/${id}`;
    if (deleting) return;

    try {
      setDeleting(true);

      // Perform the DELETE request
      const response = await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog:", err.message);
      toast.error(`Failed to delete blog: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({});
  const updateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
  };
  const handleEdit = (data) => {
    setData(data);
    setSidebarOpen(true);
  };

  if (loading)
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  if (blogs?.length < 1)
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-xl font-semibold">No blog found</p>
      </div>
    );
  if (error) return;
  <div className="w-[100vw] flex justify-center items-center py-20">
    <p className="text-xl font-semibold">Error: {error}</p>
  </div>;
  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left rounded overflow-x-scroll "
          cellspacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Image
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="h-12 text-nowrap px-6 text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Created Date
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-center text-sm font-medium stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Actions
              </th>
            </tr>
            {blogs?.map((blog) => (
              <tr key={blog?._id} className="h-[65px] my-4 py-4">
                <td className="h-12 px-3 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  <Image
                    className="w-[80px] object-cover h-[45px]"
                    src={blog?.image || ""}
                    height={100}
                    width={100}
                    alt=""
                  />
                </td>
                <td className="h-12 px-3 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {blog?.title?.length > 31
                    ? `${blog?.title.slice(0, 32)}...`
                    : blog?.title}
                </td>
                <td className="h-12 text-nowrap px-3 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {formatDate(blog?.created_at)}
                </td>
                <td className="h-12 flex justify-center items-end px-3 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                  <div className="flex justify-center items-center gap-2">
                    <Edit
                      className="cursor-pointer"
                      onClick={() => handleEdit(blog)}
                    />
                    <Trash2
                      onClick={() => handleDelete(blog?._id)}
                      className={`cursor-pointer ${
                        deleting ? "text-gray-400" : "text-red-500"
                      }`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sidebarOpen && (
        <EditBlog
          accessToken={accessToken}
          setSidebarOpen={setSidebarOpen}
          data={data}
          updateBlog={updateBlog}
        />
      )}
    </div>
  );
};

export default BlogTable;
