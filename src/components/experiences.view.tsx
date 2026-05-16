"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer I",
    company: "Nagorik Technologies Ltd.",
    location: "Dhaka, Bangladesh",
    period: "Aug 2025 – Present",
    type: "Full-time · On-site",
    current: true,
    description: [
      "Led backend development of Remit & Go — a cross-border remittance mobile app using NestJS, PostgreSQL, and Redis with BullMQ for async job processing.",
      "Integrated multiple payment gateways (Stripe, Fin.com, Transfi) and built wallet systems with real-time WebSocket notifications.",
      "Built and deployed ERC-20 smart contracts on Ethereum & Polygon; integrated Web3 wallet connectivity into production.",
      "Conducted R&D on blockchain protocols and DeFi patterns; delivered technical proposals adopted by the engineering team.",
      "Integrated OpenAI APIs with custom prompt engineering for AI-powered product features.",
      "Contributed to multiple Node.js ecosystem projects; collaborated in code reviews and architectural decisions.",
    ],
    skills: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSocket",
      "Stripe",
      "Web3",
      "Ethereum",
      "ERC-20",
      "OpenAI",
    ],
  },
  {
    title: "Software Developer",
    company: "Trignofy Technologies Inc.",
    location: "Charlottetown, Canada (Remote)",
    period: "Jun 2023 – Jul 2025",
    type: "Full-time · Remote",
    current: false,
    description: [
      "Developed key dashboard modules — Meeting Scheduler, Task Manager, Board Members — using ReactJS & TypeScript.",
      "Designed and built 200+ RESTful backend APIs (ASP.NET / C#) and implemented 100+ new features serving 2,500+ active users; boosted satisfaction by 10%.",
      "Resolved 350+ client-reported bugs and fixed 300+ end-to-end API test case failures, significantly improving reliability.",
      "Led migration of legacy ColdFusion modules to modern React.js UI/UX; received direct client commendation for improved experience.",
      "Managed Azure DevOps pipelines: CI/CD builds, release versioning, and cloud deployments on Azure.",
    ],
    skills: [
      "TypeScript",
      "ReactJS",
      "C#",
      "ASP.NET Web API",
      ".NET",
      "MySQL",
      "Azure DevOps",
      "Azure Cloud",
      "CI/CD",
      "E2E Testing",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "The Boring People",
    location: "Bengaluru, India (Remote)",
    period: "Jun 2024 – Jul 2024",
    type: "Contract · Remote",
    current: false,
    description: [
      "Built a PDF annotation platform with Next.js / TypeScript frontend, Flask REST APIs, and MongoDB for session & data management.",
      "Transformed product ideas into functional web applications from scratch.",
    ],
    skills: ["Next.js", "TypeScript", "Flask", "Python", "MongoDB", "REST API"],
  },
  {
    title: "Frontend Developer",
    company: "Knovator Technologies",
    location: "Rajkot, India (Remote)",
    period: "Sep 2022 – Dec 2022",
    type: "Internship · Remote",
    current: false,
    description: [
      "Resolved 20+ client bugs, integrated 5+ features, and implemented 20+ complex APIs including LMS integrations.",
      "Contributed to 5 active projects across the frontend.",
    ],
    skills: ["ReactJS", "TypeScript", "REST API", "Postman", "GitLab"],
  },
  {
    title: "Frontend Developer",
    company: "Semiclone",
    location: "Kolkata, India (Remote)",
    period: "Jun 2021 – Jan 2022",
    type: "Internship · Remote",
    current: false,
    description: [
      "Built an online news portal achieving 5,000+ monthly visitors.",
      "Shipped 80+ features across 5 projects using React, HTML, CSS & Figma.",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "Figma", "Bootstrap"],
  },
];

const ExperienceView = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent hidden md:block" />

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex gap-4 md:gap-6"
          >
            {/* Timeline dot */}
            <div className="hidden md:flex flex-col items-center pt-5">
              <div
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                  exp.current
                    ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-slate-700 border-slate-600"
                }`}
              />
            </div>

            {/* Card */}
            <div
              className={`flex-1 rounded-2xl border transition-all duration-300 overflow-hidden ${
                exp.current
                  ? "border-cyan-500/20 bg-cyan-500/5"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
              }`}
            >
              <button
                className="w-full text-left p-5 md:p-6"
                onClick={() =>
                  setExpanded(expanded === index ? null : index)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">
                        {exp.title}
                      </h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-cyan-400 font-medium text-sm">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span>{exp.period}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{exp.type}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div className="text-slate-500 mt-1">
                    {expanded === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {expanded === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/[0.05]"
                >
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                        <span className="text-cyan-500 mt-1 flex-shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 text-slate-400 border border-white/[0.07] hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceView;
