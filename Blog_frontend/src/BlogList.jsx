import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    axios.get("http://127.0.0.1:8000/api/blogs/")
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs", error));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-black pb-2">
        All Blogs
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-8">
          No blogs yet. Be the first to add one!
        </p>
      ) : (
        blogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="block bg-white rounded-lg shadow-md p-6 mb-5 border border-gray-200
                       hover:shadow-lg hover:border-black transition-all duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-black mb-2">
              {blog.title}
            </h3>
            <p className="italic text-gray-600 text-sm">
              Click to read more...
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default BlogList;
