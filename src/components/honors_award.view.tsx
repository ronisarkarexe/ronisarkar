"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Code2, GitPullRequest, Zap } from "lucide-react";

const achievements = [
  {
    icon: GitPullRequest,
    title: "Hacktoberfest 2023",
    subtitle: "Open Source Contribution",
    description:
      "30 pull requests with 95% acceptance rate; resolved 50+ issues across 20+ projects in October 2023.",
    badge: "30 PRs Merged",
    color: "cyan",
  },
  {
    icon: GitPullRequest,
    title: "GirlScript Summer of Code 2024",
    subtitle: "Open Source Program",
    description:
      "Active contributor in GSSOC 2024 — contributed across multiple projects in the program's open source initiative.",
    badge: "Active Contributor",
    color: "violet",
  },
  {
    icon: Trophy,
    title: "Arch-A-Thon",
    subtitle: "24-Hour Hackathon",
    description:
      "Led a team building a campus food delivery web application — food within 20 minutes. Managed full project architecture and team coordination.",
    badge: "Team Lead",
    color: "orange",
  },
  {
    icon: Zap,
    title: "Techathon 2.0",
    subtitle: "36-Hour Hackathon · Gateway Group of Companies",
    description:
      "Backend developer for a meeting scheduling platform built with a 5-member team over 36 hours.",
    badge: "Backend Dev",
    color: "emerald",
  },
  {
    icon: Trophy,
    title: "WebX — RK University",
    subtitle: "3-Hour Web Development Challenge",
    description: "Ranked 5th in university-level web development competition.",
    badge: "5th Place",
    color: "amber",
  },
  {
    icon: Code2,
    title: "DSA Problem Solving",
    subtitle: "Competitive Programming",
    description:
      "Solved 400+ problems on LeetCode and 300+ on Coding Ninjas — consistent practice in algorithms and data structures.",
    badge: "700+ Problems",
    color: "blue",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", icon: "bg-cyan-500/15" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", icon: "bg-violet-500/15" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400", icon: "bg-orange-500/15" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", icon: "bg-emerald-500/15" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", icon: "bg-amber-500/15" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", icon: "bg-blue-500/15" },
};

const HonorsAndAwardView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((award, index) => {
        const colors = colorMap[award.color];
        const Icon = award.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className={`p-5 rounded-2xl border ${colors.border} ${colors.bg} hover:opacity-90 transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-white text-sm leading-snug">
                    {award.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.border} ${colors.text} flex-shrink-0`}>
                    {award.badge}
                  </span>
                </div>
                <p className={`text-xs font-medium mb-2 ${colors.text}`}>
                  {award.subtitle}
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HonorsAndAwardView;
