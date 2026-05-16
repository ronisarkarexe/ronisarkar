"use client";

import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Languages",
    color: "cyan",
    skills: ["JavaScript", "TypeScript", "SQL", "Java", "C#", "CSS"],
  },
  {
    category: "Backend & APIs",
    color: "violet",
    skills: [
      "NestJS",
      "Node.js",
      "ExpressJS",
      "RESTful API",
      "GraphQL",
      "WebSocket",
      "BullMQ",
      "Redis",
      "Flask",
    ],
  },
  {
    category: "Frontend",
    color: "blue",
    skills: ["ReactJS", "Next.js", "Redux", "TailwindCSS", "Firebase"],
  },
  {
    category: "Databases",
    color: "emerald",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM"],
  },
  {
    category: "Blockchain & Web3",
    color: "orange",
    skills: [
      "Ethereum",
      "Polygon",
      "ERC-20 Smart Contracts",
      "Wallet Integration",
      "Solidity",
      "DeFi",
    ],
  },
  {
    category: "Payments & AI",
    color: "pink",
    skills: [
      "Stripe",
      "Fin.com",
      "Transfi",
      "OpenAI API",
      "Prompt Engineering",
      "Cursor",
      "Claude",
    ],
  },
  {
    category: "Tools & DevOps",
    color: "amber",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "Azure DevOps",
      "Azure Cloud",
      "Jira",
      "Postman",
      "Swagger",
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  cyan: {
    bg: "bg-cyan-500/10 hover:bg-cyan-500/15",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  violet: {
    bg: "bg-violet-500/10 hover:bg-violet-500/15",
    border: "border-violet-500/20",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
  blue: {
    bg: "bg-blue-500/10 hover:bg-blue-500/15",
    border: "border-blue-500/20",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  emerald: {
    bg: "bg-emerald-500/10 hover:bg-emerald-500/15",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  orange: {
    bg: "bg-orange-500/10 hover:bg-orange-500/15",
    border: "border-orange-500/20",
    text: "text-orange-400",
    dot: "bg-orange-400",
  },
  pink: {
    bg: "bg-pink-500/10 hover:bg-pink-500/15",
    border: "border-pink-500/20",
    text: "text-pink-400",
    dot: "bg-pink-400",
  },
  amber: {
    bg: "bg-amber-500/10 hover:bg-amber-500/15",
    border: "border-amber-500/20",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
};

const SkillsView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {skillCategories.map((cat, index) => {
        const colors = colorMap[cat.color];
        return (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className={`p-5 rounded-2xl border ${colors.border} bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300`}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <h3 className={`font-semibold text-sm uppercase tracking-wider ${colors.text}`}>
                {cat.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${colors.border} ${colors.bg} text-slate-300 hover:text-white transition-all duration-200 cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsView;
