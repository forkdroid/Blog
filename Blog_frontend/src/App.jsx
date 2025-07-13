import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import AddBlog from "./AddBlog";
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import BlogDetail from "./BlogDetail";
import { isLoggedIn, logout } from "./auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    setLoggedIn(isLoggedIn()); // Ensure state is synced on load
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false); // update header immediately
    window.location.href = "/login"; // optional: redirect after logout
  };

  return (
    <Router>
      <Header isLoggedIn={loggedIn} handleLogout={handleLogout} />

      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-3xl font-bold mb-4">Blog App</h1>
                <BlogList />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
