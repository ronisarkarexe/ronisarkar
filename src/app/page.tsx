"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import SkillsCloud from "@/components/skills.view";
import ExperienceView from "@/components/experiences.view";
import ProjectsView from "@/components/projects.view";
import EducationView from "@/components/education.view";
import HonorsAndAwardView from "@/components/honors_award.view";
import ContactMeView from "@/components/contact_and_hire_me.view";
import FooterView from "@/components/footer.view";
import HeroView from "@/components/hero_view";

type SectionKeys =
  | "home"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "awards";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionKeys>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionRefs: Record<
    SectionKeys,
    React.MutableRefObject<HTMLElement | null>
  > = {
    home: useRef<HTMLElement | null>(null),
    experience: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    skills: useRef<HTMLElement | null>(null),
    education: useRef<HTMLElement | null>(null),
    awards: useRef<HTMLElement | null>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionKeys);
          }
        });
      },
      { threshold: 0.5 }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50 opacity-50" />
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold">Roni Sarkar</span>
            </motion.div>
            <div className="hidden md:flex space-x-4">
              {Object.keys(sectionRefs).map((section) => (
                <Button
                  key={section}
                  variant="ghost"
                  className={`text-sm ${
                    activeSection === section
                      ? "text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => scrollToSection(section as SectionKeys)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              ))}
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            {Object.keys(sectionRefs).map((section) => (
              <Button
                key={section}
                variant="ghost"
                className="w-full text-left py-2 px-4"
                onClick={() => scrollToSection(section as SectionKeys)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </div>
        )}
      </nav>

      <main className="container mx-auto px-6 pt-20">
        <section
          id="home"
          ref={sectionRefs.home}
          className="py-20 relative overflow-hidden"
        >
          {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600 animate-wave"
              style={{
                WebkitTextStroke: "1px transparent",
                opacity: 0.3,
                animation:
                  "wave 3s ease-in-out infinite, borderAnimation 3s linear infinite",
              }}
            >
              Open To Work
            </div>
          </div> */}
          <HeroView />
        </section>

        {/*<section id="about" ref={sectionRefs.about} className="py-20 relative">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <AboutMeView />
        </section>*/}

        <section id="experience" ref={sectionRefs.experience} className="py-20">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <ExperienceView />
        </section>

        <section id="skills" ref={sectionRefs.skills} className="py-20">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <SkillsCloud />
        </section>

        <section id="projects" ref={sectionRefs.projects} className="py-20">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <ProjectsView />
        </section>

        <section id="education" ref={sectionRefs.education} className="py-20">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <EducationView />
        </section>

        <section id="awards" ref={sectionRefs.awards} className="py-20">
          <h2 className="text-3xl font-bold mb-8">Honors & Awards</h2>
          <HonorsAndAwardView />
        </section>

        <section>
          <ContactMeView />
        </section>
      </main>
      <FooterView />
    </div>
  );
}
