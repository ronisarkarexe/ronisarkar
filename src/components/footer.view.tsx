import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import React from "react";

const links = [
  {
    icon: Github,
    href: "https://github.com/ronisarkarexe",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ronisarkar76/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:ronichandrasarkar@gmail.com",
    label: "Email",
  },
  {
    icon: Code2,
    href: "https://leetcode.com/u/ronisarkar",
    label: "LeetCode",
  },
];

const FooterView = () => {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-bold mb-1">
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Roni Sarkar
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              Software Engineer · Full Stack · Web3 · AI
            </p>
          </div>

          <div className="flex items-center gap-2">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/[0.06] flex items-center justify-center transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-700">
          <p>© 2026 Roni Sarkar. All rights reserved.</p>
          {/* <p>
            Built with{" "}
            <span className="text-slate-600">Next.js · TailwindCSS · Framer Motion</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
