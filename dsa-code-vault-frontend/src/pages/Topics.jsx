import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/codes`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch topics");
        return res.json();
      })
      .then((data) => {
        // Extract unique categories from backend
        const uniqueCategories = [
          ...new Set(
            data
              .map((item) => item.category)
              .filter((c) => c && c.trim() !== "")
          ),
        ];

        setTopics(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Choose a Topic to Learn
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select a topic to understand concepts step by step and practice real
          programs from beginner to advanced level.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg font-semibold">⏳ Loading topics...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-center py-10 text-red-500">
          <p className="text-lg font-semibold">
            ⚠️ Unable to load topics
          </p>
          <p className="text-sm mt-2">
            Please refresh the page or try again later.
          </p>
        </div>
      )}

      {/* TOPICS GRID */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() =>
                navigate(
                  `/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`
                )
              }
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-xl p-6
                text-center font-medium
                hover:shadow-lg hover:scale-105
                transition-all duration-300
              "
            >
              <span className="text-lg">{topic}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
