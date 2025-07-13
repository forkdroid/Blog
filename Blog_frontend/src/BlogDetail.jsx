import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, getToken } from "./auth";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch blog
    axios.get(`http://127.0.0.1:8000/api/blogs/${id}/`)
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error fetching blog", err));

    // Fetch comments (with token)
    axios.get(`http://127.0.0.1:8000/api/comments/?blog=${id}`, {
      headers: { Authorization: `Token ${getToken()}` }
    })
      .then(res => setComments(res.data))
      .catch(err => console.error("Error fetching comments", err));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/comments/",
        { blog: id, content: newComment },
        { headers: { Authorization: `Token ${getToken()}` } }
      );
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  if (!blog) return <p className="text-center p-6 text-gray-500">Loading blog...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-green-600 mb-4">{blog.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
      <p className="text-sm text-gray-500 mt-4 mb-10">
        Published on: {new Date(blog.created_at).toLocaleString()}
      </p>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-100 p-3 rounded shadow-sm text-gray-800"
            >
              {comment.content}
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn() && (
        <form
          onSubmit={handleCommentSubmit}
          className="mt-6 flex flex-col gap-3"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="border border-gray-300 rounded p-2"
            rows="3"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </form>
      )}

      {!isLoggedIn() && (
        <p className="mt-6 text-gray-600 italic text-sm">
          You must be logged in to add comments.
        </p>
      )}
    </div>
  );
};

export default BlogDetail;
