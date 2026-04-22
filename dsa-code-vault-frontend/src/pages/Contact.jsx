import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Let’s <span className="text-blue-600 dark:text-blue-400">Collaborate 🤝</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
          I’m always open to new opportunities, collaborations, or even a good tech talk.  
          Whether you want to discuss development, DSA, or potential projects — feel free to reach out!
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <a
            href="mailto:krupakarpujari1510@gmail.com"
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Mail size={22} /> Email Me
          </a>

          <a
            href="https://www.github.com/23R01A05BM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Github size={22} /> GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/krupakar-pujari-13734b314"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Linkedin size={22} /> LinkedIn
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 w-24 mx-auto mb-8"></div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Designed & built with ❤️ by <span className="font-semibold">Krupakar Pujari</span>
        </p>
      </div>
    </section>
  );
}
