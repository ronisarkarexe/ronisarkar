import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Trignofy Technologies Inc",
    location: "Charlottetown, Canada",
    period: "Jun 2023 - Jun 2024",
    description: [
      "Developed a UI drag-and-drop tool for the admin dashboard. 20% boost in user satisfaction levels.",
      "Resolved over 180 client bugs and enhanced documentation. Created 50-plus backend APIs.",
      "Identified and fixed more than 180-plus API test case issues, ensuring the accuracy and reliability of the API.",
      "Implemented over 60 new features to our existing website, benefiting a user base of nearly 2000+ active users.",
    ],
    skills: [
      "TypeScript",
      "ReactJS",
      "C#",
      "DotNet",
      "MySQL",
      "Azure DevOps",
      "GitHub",
      "Testing",
      "ASP.NET Web API",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "The Boring People",
    location: "Bengaluru, Karnataka, India",
    period: "Jun 2023 - July 2024",
    description: [
      "Built web applications from scratch, transforming ideas into functional products.",
      "Resolved client bugs and added new features, integrating them into the frontend",
    ],
    skills: [
      "Next.JS",
      "Flask",
      "Python",
      "TypeScript",
      "REST API",
      "Node.JS",
      "GitHub",
    ],
  },
  {
    title: "React Developer",
    company: "Knovator Technologies",
    location: "Rajkot, Gujarat, India",
    period: "Sep 2022 - Dec 2022",
    description: [
      "Identified and Solved 15 website bugs and integrated 5 plus new features.",
      "Resolved more than 20 client bugs. And contributing to over 5 projects.",
      "Implementation of complex 20-plus APIs like LMS for education platforms.",
    ],
    skills: ["ReactJS", "TypeScript", "REST API", "Postman", "GitLab"],
  },
  {
    title: "Frontend Developer",
    company: "Semiclone",
    location: "Newtown, Kolkata, India",
    period: "Jun 2021 - Jan 2022",
    description: [
      "Major a build an online news portal platform. achieving over 5,000 monthly visitors.",
      "Completed 5 projects, collaborating with teams to develop frontend websites utilizing HTML, and CSS.",
      "Fixed more than 60 client bugs And introduced 80 plus new features overall.",
    ],
    skills: [
      "React",
      "Figma",
      "Javascript",
      "HTML",
      "CSS",
      "Bootstrap",
      "UI/UX",
    ],
  },
];

const ExperienceView = () => {
  return (
    <div className="relative">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-8 flex"
        >
          <div className="flex flex-col items-center mr-4">
            <div className="w-px h-full bg-purple-500 flex-grow"></div>
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <Briefcase className="w-3 h-3 text-white" />
            </div>
            <div className="w-px h-full bg-purple-500 flex-grow"></div>
          </div>
          <Card className="bg-gray-800 border-gray-700 flex-grow">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
              <p className="text-purple-400 mb-2">
                {exp.company} - {exp.location}
              </p>
              <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceView;
