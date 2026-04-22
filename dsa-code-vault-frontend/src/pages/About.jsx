import React from "react";
import { Code, Laptop, Database, Globe } from "lucide-react";

export default function About() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-16 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          About <span className="text-blue-600 dark:text-blue-400">Me</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          Hello! I’m <span className="font-semibold">Krupakar Pujari</span>, a 3rd year Computer Science 
          and Engineering student at <span className="font-semibold">CMR Institute of Technology, Hyderabad</span>.
          I’m passionate about <strong>full-stack web development</strong> and 
          <strong> Data Structures & Algorithm problem solving</strong>.
        </p>

        {/* What I Love Doing */}
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            What I Love Doing 💻
          </h3>
          <ul className="space-y-3 text-left text-gray-700 dark:text-gray-300 list-disc list-inside">
            <li>Building responsive and modern web applications.</li>
            <li>Solving complex problems using DSA techniques.</li>
            <li>Designing efficient backend systems and APIs.</li>
            <li>Exploring modern technologies & tools in software engineering.</li>
          </ul>
        </div>

        {/* Technical Skills */}
        <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center mb-12">
          {[
            "C",
            "Java",
            "Python",
            "JavaScript",
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "MySQL",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Git & GitHub",
            "REST APIs",
          ].map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-10 mt-6 text-blue-600 dark:text-blue-400">
          <Code size={32} />
          <Laptop size={32} />
          <Database size={32} />
          <Globe size={32} />
        </div>
      </div>
    </section>
  );
}
