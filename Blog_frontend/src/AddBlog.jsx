import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "./auth"; // ✅ Import token function

const AddBlog = ({ onBlogAdded }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (!title.trim() || !content.trim()) {
            setMessage("Please fill in both title and content.");
            return;
        }

        axios.post(
            "http://127.0.0.1:8000/api/blogs/",
            { title, content },
            {
                headers: {
                    Authorization: `Token ${getToken()}`
                }
            }
        )
        .then(response => {
            setTitle("");
            setContent("");

            if (onBlogAdded) {
                onBlogAdded();
            }

            setMessage("Blog added successfully! Redirecting to home page...");

            setTimeout(() => {
                navigate("/");
            }, 2000);
        })
        .catch(error => {
            console.error("Error adding blog:", error.response); // <-- LOG THE FULL ERROR RESPONSE

                let errorMessage = "Failed to add blog. Please try again.";
                if (error.response && error.response.data) {
                    // If Django sent back specific validation errors, display them
                    errorMessage = "Error: " + JSON.stringify(error.response.data);
                    // You might see something like {"title": ["This field may not be blank."]}
                }
                setMessage(errorMessage);
        });
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4 mt-10">
            <h2 className="text-2xl text-gray-800 font-semibold text-center">Add a New Blog</h2>

            {message && (
                <div className={`p-3 rounded-md text-center ${
                    message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-y"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
