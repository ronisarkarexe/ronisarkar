import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const FooterView = () => {
  return (
    <footer className="bg-gray-900 py-6 mt-20">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p className="text-gray-400">
          &copy; 2024 Roni Chandra Sarkar. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/ronisarkar"
            className="text-gray-400 hover:text-white"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/ronisarkar"
            className="text-gray-400 hover:text-white"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:ronichandrasarkar@gmail.com"
            className="text-gray-400 hover:text-white"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
