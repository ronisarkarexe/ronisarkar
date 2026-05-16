"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Code2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Companies", value: "5" },
  { label: "LeetCode Problems", value: "400+" },
  { label: "OSS PRs Merged", value: "30+" },
];

const HeroView = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20">
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            Open to new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Roni
            </span>{" "}
            <span className="text-white">Sarkar</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-2"
        >
          <p className="text-xl md:text-2xl text-slate-300 font-medium">
            Software Engineer I{" "}
            <span className="text-cyan-400">@ Nagorik Technologies</span>
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-1.5 text-slate-500 text-sm mb-8"
        >
          <MapPin className="w-3.5 h-3.5" />
          Uttara, Dhaka, Bangladesh
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-400 max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Full Stack Engineer building cross-border remittance & fintech
          platforms with{" "}
          <span className="text-cyan-400/80">NestJS</span>,{" "}
          <span className="text-violet-400/80">Web3 / Ethereum</span>, and{" "}
          <span className="text-cyan-400/80">real-time systems</span>. Passionate
          about open source, DeFi, and AI-assisted development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <a
            href="mailto:ronichandrasarkar@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
          <a
            href="https://github.com/ronisarkarexe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </a>
          <a
            href="https://www.linkedin.com/in/ronisarkar76/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </a>
          <a
            href="https://leetcode.com/u/ronisarkar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-200"
          >
            <Code2 className="w-4 h-4" />
            LeetCode
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </a>
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/document/d/1Z0_fOnpGMZTeIkDtT0cb-0eOi211JMl5aLTpf2FFIh0/edit",
                "_blank"
              )
            }
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-violet-500/30 hover:border-violet-500/50 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 hover:text-violet-300 font-medium transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Resume
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroView;
