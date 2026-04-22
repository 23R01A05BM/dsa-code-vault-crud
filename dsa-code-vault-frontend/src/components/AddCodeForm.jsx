import React, { useState } from "react";

const LANGUAGES = ["C", "C++", "Java", "Python", "JavaScript", "Go", "Kotlin"];
const CATEGORIES = [
  "Array", "String", "Linked List", "Stack", "Queue", "Tree", "Graph",
  "Heap / Priority Queue", "HashMap", "HashSet", "Two Pointer",
  "Sliding Window", "Binary Search", "Greedy", "Recursion",
  "Dynamic Programming (DP)", "Backtracking", "Bit Manipulation", "Maths",
  "Matrix", "Trie", "Miscellaneous"
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function AddCodeForm({ addCode }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !language || !category || !difficulty || !code) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/codes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, language, category, difficulty, code }),
    });

    const data = await res.json();
    addCode(data);

    setTitle("");
    setLanguage("");
    setCategory("");
    setDifficulty("");
    setCode("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <option value="">Select Language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <option value="">Select Difficulty</option>
          {DIFFICULTIES.map((diff) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Enter your code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono"
        rows={8}
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add Code
      </button>
    </form>
  );
}

export default AddCodeForm;
