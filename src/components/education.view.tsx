"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "RK University",
    location: "Gujarat, India",
    period: "Aug 2021 – Apr 2025",
    cgpa: "8.27",
    highlights: [
      "Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks",
      "Active participant in technical hackathons and coding competitions",
      "Contributed to 20+ open source projects during academic years",
    ],
  },
];

const EducationView = () => {
  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {edu.degree}
                </h3>
                <p className="text-violet-400 font-medium text-sm mb-1">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:flex-col md:items-end">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-bold text-lg">{edu.cgpa}</span>
                <span className="text-slate-500 text-xs">/ 10 CGPA</span>
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {edu.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default EducationView;
