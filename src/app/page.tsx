"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ArrowUp } from "lucide-react";
import HeroView from "@/components/hero_view";
import ExperienceView from "@/components/experiences.view";
import SkillsView from "@/components/skills.view";
import ProjectsView from "@/components/projects.view";
import BlogView from "@/components/blog.view";
import EducationView from "@/components/education.view";
import HonorsAndAwardView from "@/components/honors_award.view";
import ContactMeView from "@/components/contact_and_hire_me.view";
import FooterView from "@/components/footer.view";

type SectionKeys =
  | "home"
  | "experience"
  | "skills"
  | "projects"
  | "blog"
  | "education"
  | "contact";

const navLabels: Record<SectionKeys, string> = {
  home: "Home",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  blog: "Blog",
  education: "Education",
  contact: "Contact",
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionKeys>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs: Record<
    SectionKeys,
    React.MutableRefObject<HTMLElement | null>
  > = {
    home: useRef<HTMLElement | null>(null),
    experience: useRef<HTMLElement | null>(null),
    skills: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    blog: useRef<HTMLElement | null>(null),
    education: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionKeys);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: SectionKeys) => {
    const ref = sectionRefs[section].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-white grid-bg" style={{ backgroundColor: "#050816" }}>
      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050816]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                RS
              </span>
              <span className="text-white/50 ml-1 text-sm font-normal hidden sm:inline">
                / Roni Sarkar
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {(Object.keys(sectionRefs) as SectionKeys[]).map((section, i) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {navLabels[section]}
                </motion.button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-[#050816]/95 backdrop-blur-xl"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {(Object.keys(sectionRefs) as SectionKeys[]).map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                      activeSection === section
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {navLabels[section]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6">
        <section id="home" ref={sectionRefs.home} className="pt-20">
          <HeroView />
        </section>

        <section id="experience" ref={sectionRefs.experience} className="py-24">
          <SectionHeader title="Experience" subtitle="My professional journey" />
          <ExperienceView />
        </section>

        <section id="skills" ref={sectionRefs.skills} className="py-24">
          <SectionHeader title="Skills" subtitle="Technologies I work with" />
          <SkillsView />
        </section>

        <section id="projects" ref={sectionRefs.projects} className="py-24">
          <SectionHeader title="Projects" subtitle="Things I've built" />
          <ProjectsView />
        </section>

        <section id="blog" ref={sectionRefs.blog} className="py-24">
          <SectionHeader title="Blog" subtitle="Thoughts on tech & engineering" />
          <BlogView />
        </section>

        <section id="education" ref={sectionRefs.education} className="py-24">
          <SectionHeader title="Education & Awards" subtitle="Academic background & achievements" />
          <div className="space-y-8">
            <EducationView />
            <HonorsAndAwardView />
          </div>
        </section>

        <section id="contact" ref={sectionRefs.contact} className="py-24">
          <SectionHeader title="Get In Touch" subtitle="Let's work together" />
          <ContactMeView />
        </section>
      </main>

      <FooterView />

      {/* Scroll to top button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollToSection("home")}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 backdrop-blur-sm transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-slate-500 text-sm">{subtitle}</p>
      <div className="mt-4 h-px bg-gradient-to-r from-cyan-400/30 via-violet-400/20 to-transparent" />
    </div>
  );
}
