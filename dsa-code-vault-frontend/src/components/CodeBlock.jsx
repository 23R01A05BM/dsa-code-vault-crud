import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

// Prism language support
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";

// Language mapping
const languageMap = {
  javascript: "javascript",
  js: "javascript",
  java: "java",
  c: "c",
  "c++": "cpp",
  cpp: "cpp",
  python: "python",
  py: "python",
  go: "go",
  golang: "go",
};

export default function CodeBlock({ code = "", language = "" }) {
  const codeRef = useRef(null);
  const prismLang = languageMap[language?.toLowerCase()] || "clike";

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, prismLang]);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg">
      <pre
        className="
          bg-gray-900
          text-gray-100
          font-mono
          text-xs sm:text-sm
          leading-relaxed
          p-3 sm:p-4
          overflow-x-auto
          max-w-full
          rounded-lg
        "
      >
        <code
          ref={codeRef}
          className={`language-${prismLang} block whitespace-pre`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
