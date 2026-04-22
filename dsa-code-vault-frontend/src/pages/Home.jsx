import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="
        flex flex-col items-center justify-center min-h-screen text-center px-6 
        bg-white dark:bg-gray-900
        text-black dark:text-white transition-colors duration-500
      "
    >
      {/* Hero Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
        Welcome to{" "}
        <span className="text-blue-600 dark:text-blue-400">
          DSA Code Vault
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        A curated collection of Data Structure & Algorithm codes built for
        learners and developers.
        <br />
        Created and maintained by{" "}
        <span className="font-semibold">Krupakar Pujari</span>.
      </p>

      {/* EXPLORE PROGRAMS (unchanged) */}
      <NavLink
        to="/programs"
        className="inline-block px-8 py-3 text-lg font-medium rounded-full 
                   bg-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105 
                   transition-all duration-300 hover:bg-blue-700"
      >
        Explore Programs →
      </NavLink>

      {/* SUPPORTING TEXT */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mt-8">
        New to coding or DSA? Start learning topic-wise with clear explanations
        and example programs on Arrays, Strings, Linked Lists, Trees and more.
      </p>

      {/* 🔹 ONLY ONE GREEN BUTTON BELOW TEXT */}
      <NavLink
        to="/topics"
        className="mt-4 inline-block px-7 py-2.5 text-base font-medium rounded-full
                   bg-green-600 text-white shadow hover:shadow-md
                   hover:bg-green-700 transition-all duration-300"
      >
        Start Learning by Topic →
      </NavLink>
    </section>
  );
}
