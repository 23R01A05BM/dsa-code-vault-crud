import React, { useState, useEffect } from "react";
import AddCodeForm from "../components/AddCodeForm";
import FilterBar from "../components/FilterBar";
import CodeCard from "../components/CodeCard";

export default function Programs({ isLoggedIn }) {
  const [codes, setCodes] = useState([]);
  const [filter, setFilter] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("Newest First");

  // ✅ Loading & Error states (kept)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/codes`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setCodes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const addCode = (newCode) => {
    setCodes((prev) => [newCode, ...prev]);
  };

  const filteredCodes = codes
    .filter(
      (c) =>
        c.title.toLowerCase().includes(filter.toLowerCase()) ||
        c.language.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((c) => (language ? c.language === language : true))
    .filter((c) => (category ? c.category === category : true))
    .filter((c) => (difficulty ? c.difficulty === difficulty : true))
    .sort((a, b) => {
      if (sort === "Newest First")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "Oldest First")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "Title A → Z") return a.title.localeCompare(b.title);
      if (sort === "Title Z → A") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {isLoggedIn && <AddCodeForm addCode={addCode} />}

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        language={language}
        setLanguage={setLanguage}
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        sort={sort}
        setSort={setSort}
      />

      {/* ⏳ LOADING STATE */}
      {loading && (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg font-semibold">⏳ Waking up the server...</p>
          <p className="text-sm mt-2">
            Please wait a few seconds while the backend becomes active.
          </p>
        </div>
      )}

      {/* ❌ ERROR STATE */}
      {error && !loading && (
        <div className="text-center py-10 text-red-500">
          <p className="text-lg font-semibold">⚠️ Unable to load programs</p>
          <p className="text-sm mt-2">
            Please refresh the page or try again later.
          </p>
        </div>
      )}

      {/* ✅ DATA STATE (RESPONSIVE GRID) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((code) => (
            <CodeCard
              key={code._id}
              code={code}
              setCodes={setCodes}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </section>
  );
}
