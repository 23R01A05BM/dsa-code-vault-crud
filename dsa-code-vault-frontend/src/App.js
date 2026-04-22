import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

import Home from "./pages/Home";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Contact from "./pages/Contact";

// 🔹 NEW PAGES
import Topics from "./pages/Topics";
import TopicPrograms from "./pages/TopicPrograms";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div
        className={
          darkMode
            ? "dark bg-gray-900 min-h-screen text-gray-100"
            : "bg-gray-100 min-h-screen text-gray-900"
        }
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Existing */}
          <Route path="/programs" element={<Programs isLoggedIn={isLoggedIn} />} />

          {/* 🔹 NEW FLOW */}
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:topicName" element={<TopicPrograms />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
