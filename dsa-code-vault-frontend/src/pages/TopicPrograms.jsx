import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeCard from "../components/CodeCard";
import TOPICS from "../data/topics";

export default function TopicPrograms() {
  const { topicName } = useParams();
  const navigate = useNavigate();

  // Normalize URL param (e.g. linked-list → linked list)
  const normalizedTopic = topicName.replace(/-/g, " ").toLowerCase();
  const topicInfo = TOPICS[normalizedTopic];

  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/codes`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch programs");
        return res.json();
      })
      .then((data) => {
        const filteredCodes = data.filter(
          (c) =>
            c.category &&
            c.category.toLowerCase() === normalizedTopic
        );
        setCodes(filteredCodes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [normalizedTopic]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/topics")}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to Topics
      </button>

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold">
        {topicInfo ? topicInfo.title : "Topic"}
      </h1>

      {/* TOPIC CONTENT */}
      {!topicInfo && (
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl">
          <p className="font-semibold">Topic information not available.</p>
          <p className="text-sm mt-1">
            This topic exists in programs but learning content has not been
            added yet.
          </p>
        </div>
      )}

      {topicInfo &&
        topicInfo.sections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-3"
          >
            <h2 className="text-2xl font-semibold">
              {section.heading}
            </h2>

            {section.content && (
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            )}

            {section.list && (
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

      {/* PROGRAMS SECTION */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">
          Programs on {topicInfo?.title}
        </h2>

        {loading && (
          <p className="text-gray-600">⏳ Loading programs...</p>
        )}

        {error && (
          <p className="text-red-500">
            ❌ Unable to load programs for this topic.
          </p>
        )}

        {!loading && !error && codes.length === 0 && (
          <p className="text-gray-500">
            No programs added for this topic yet.
          </p>
        )}

        {!loading && !error && codes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {codes.map((code) => (
              <CodeCard
                key={code._id}
                code={code}
                setCodes={() => {}}
                isLoggedIn={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
