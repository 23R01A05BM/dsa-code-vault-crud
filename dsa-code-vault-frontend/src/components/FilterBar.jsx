import React from "react";

const LANGUAGES = ["C", "C++", "Java", "Python", "JavaScript", "Go", "Kotlin"];
const CATEGORIES = [
  "Array", "String", "Linked List", "Stack", "Queue", "Tree", "Graph",
  "Heap / Priority Queue", "HashMap", "HashSet", "Two Pointer",
  "Sliding Window", "Binary Search", "Greedy", "Recursion",
  "Dynamic Programming (DP)", "Backtracking", "Bit Manipulation", "Maths",
  "Matrix", "Trie", "Miscellaneous"
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function FilterBar({ filter, setFilter, language, setLanguage, category, setCategory, difficulty, setDifficulty, sort, setSort }) {
  return (
    <div className="flex flex-wrap gap-3 justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <input
        type="text"
        placeholder="Search by title or language..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="flex-1 min-w-[200px] p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
      />

      <div className="flex flex-wrap gap-3">
        {[{value: language, set: setLanguage, list: LANGUAGES, label: "Language"},
          {value: category, set: setCategory, list: CATEGORIES, label: "Category"},
          {value: difficulty, set: setDifficulty, list: DIFFICULTIES, label: "Difficulty"}]
          .map((sel) => (
            <select
              key={sel.label}
              value={sel.value}
              onChange={(e) => sel.set(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            >
              <option value="">All {sel.label}s</option>
              {sel.list.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Title A → Z</option>
          <option>Title Z → A</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
