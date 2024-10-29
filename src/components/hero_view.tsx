import React from "react";
import { motion } from "framer-motion";
import { Code, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

const HeroView = () => {
  const downloadResume = () => {
    const downloadUrl = `https://docs.google.com/document/d/1Z0_fOnpGMZTeIkDtT0cb-0eOi211JMl5aLTpf2FFIh0/edit`;
    window.open(downloadUrl, "_blank");
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl font-bold mb-4">Roni Sarkar</h1>
        <p className="text-xl text-gray-400 mb-8">
          Full Stack Developer | Open Source Contributor
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <a href="mailto:ronichandrasarkar@gmail.com">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/ronisarkarexe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://www.linkedin.com/in/ronisarkar76/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://leetcode.com/u/ronisarkar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="mr-2 h-4 w-4" /> LeetCode
            </a>
          </Button>
          <Button variant="secondary" onClick={downloadResume}>
            <Download className="mr-2 h-4 w-4" /> Resume
          </Button>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-8 w-1/2 mx-auto mt-4">
            Final Year B.Tech Student | 2 Years of Experience as a Full Stack
            Developer, including Internship | Passionate about Building Scalable
            Web Applications
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default HeroView;
