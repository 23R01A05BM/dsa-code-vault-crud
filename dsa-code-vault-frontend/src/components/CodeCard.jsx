import React, { useState } from "react";
import { ClipboardCopy, Edit3, Trash2, Check, Maximize2 } from "lucide-react";
import CodeBlock from "./CodeBlock";

const LANGUAGES = ["C", "C++", "Java", "Python", "JavaScript", "Go", "Kotlin"];
const CATEGORIES = [
  "Array", "String", "Linked List", "Stack", "Queue", "Tree", "Graph",
  "Heap / Priority Queue", "HashMap", "HashSet", "Two Pointer",
  "Sliding Window", "Binary Search", "Greedy", "Recursion",
  "Dynamic Programming (DP)", "Backtracking", "Bit Manipulation", "Maths",
  "Matrix", "Trie", "Miscellaneous"
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function CodeCard({ code, setCodes, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullView, setFullView] = useState(false);

  const [title, setTitle] = useState(code.title);
  const [language, setLanguage] = useState(code.language);
  const [category, setCategory] = useState(code.category);
  const [difficulty, setDifficulty] = useState(code.difficulty);
  const [snippet, setSnippet] = useState(code.code);

  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (msg, type = "success", duration = 2000) => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), duration);
  };

  const openEdit = () => {
    setTitle(code.title);
    setLanguage(code.language);
    setCategory(code.category);
    setDifficulty(code.difficulty);
    setSnippet(code.code);
    setIsOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/codes/${code._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, language, category, difficulty, code: snippet }),
        }
      );

      if (!res.ok) throw new Error();
      const updated = await res.json();

      setCodes((prev) => prev.map((c) => (c._id === code._id ? updated : c)));
      showToast("✅ Saved Successfully");
      setTimeout(() => setIsOpen(false), 700);
    } catch {
      showToast("❌ Failed to update", "error", 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/codes/${code._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      setCodes((prev) => prev.filter((c) => c._id !== code._id));
      showToast("🗑️ Code deleted successfully");
    } catch {
      showToast("❌ Failed to delete", "error", 2500);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow hover:shadow-lg transition group space-y-2">

        {/* TOP RIGHT ICONS */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* FULL VIEW (FOR ALL USERS) */}
          <button
            onClick={() => setFullView(true)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Full View"
          >
            <Maximize2 size={16} />
          </button>

          {/* ADMIN ICONS */}
          {isLoggedIn && (
            <>
              <button
                onClick={openEdit}
                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
                title="Edit"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}

          {/* COPY (NON ADMIN) */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(code.code);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Copy Code"
            >
              {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
            </button>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          {code.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {code.language} • {code.category} • {code.difficulty}
        </p>

        {/* CODE PREVIEW */}
        <div className="rounded-lg max-h-64 overflow-y-auto">
          <CodeBlock code={code.code} language={code.language} />
        </div>

        <p className="text-[10px] sm:text-xs text-gray-400">
          Added on: {new Date(code.createdAt).toLocaleString()}
        </p>
      </div>

      {/* FULL VIEW MODAL */}
      {fullView && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3">
          <div className="relative w-full h-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl flex flex-col">

            <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
              <h2 className="text-sm sm:text-base font-semibold">
                {code.title} — {code.language}
              </h2>
              <button
                onClick={() => setFullView(false)}
                className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <CodeBlock code={code.code} language={code.language} />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl space-y-4 text-center">
            <h2 className="font-semibold">Confirm Delete</h2>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this code?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-xl space-y-4">
            <h2 className="font-semibold">Edit Code</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-800"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[LANGUAGES, CATEGORIES, DIFFICULTIES].map((list, i) => (
                <select
                  key={i}
                  value={[language, category, difficulty][i]}
                  onChange={(e) =>
                    [setLanguage, setCategory, setDifficulty][i](e.target.value)
                  }
                  className="p-2 border rounded dark:bg-gray-800"
                >
                  <option value="">Select</option>
                  {list.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              ))}
            </div>

            <textarea
              rows={10}
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              className="w-full p-3 font-mono rounded dark:bg-gray-800"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

export default CodeCard;
