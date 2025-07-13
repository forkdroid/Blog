import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/", form);
      setMessage("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // ✅ Redirect after signup
      }, 1000);
    } catch (err) {
      setMessage("Registration failed.");
      console.error(err);
    }
  };

  return (
    <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4 mt-10">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Added space-y-4 for vertical spacing */}
        <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            // Tailwind classes for input: full width, padding, border, rounded, focus styles
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br /> {/* Removed <br /> as space-y-4 handles spacing, but keeping for direct comparison */}

        <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            // Tailwind classes for input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br /> {/* Removed <br /> */}

        <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            // Tailwind classes for input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br /> {/* Removed <br /> */}

        <button
            type="submit"
            // Tailwind classes for button: green background for signup, white text, bold, padding, rounded, hover effect
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
            Sign Up
        </button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-700">{message}</p> {/* Styled message paragraph */}
</div>
  );
};

export default Signup;
