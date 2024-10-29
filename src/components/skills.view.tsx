import React from "react";

const skills = [
  { name: "Typescript", size: 32, weight: 400 },
  { name: "Node.JS", size: 16, weight: 400 },
  { name: "C#", size: 25, weight: 400 },
  { name: "CSS", size: 18, weight: 400 },
  { name: "HTML", size: 18, weight: 400 },
  { name: "Redux", size: 18, weight: 400 },
  { name: "NextJS", size: 16, weight: 400 },
  { name: "Express.JS", size: 16, weight: 400 },
  { name: "MySQL", size: 16, weight: 400 },
  { name: "PostgreSQL", size: 14, weight: 400 },
  { name: "MongoDB", size: 14, weight: 400 },
  { name: "Git", size: 14, weight: 400 },
  { name: "REST API", size: 14, weight: 400 },
  { name: "Javascript", size: 28, weight: 400 },
  { name: "AzureDevOps", size: 18, weight: 400 },
  { name: "Testing", size: 15, weight: 400 },
  { name: "GitHub", size: 25, weight: 400 },
  { name: "ASP.NET", size: 14, weight: 400 },
  { name: "Java", size: 26, weight: 400 },
  { name: "UI/UX", size: 14, weight: 400 },
  { name: "DSA", size: 20, weight: 400 },
];

const buttonSkills = [
  "ReactJS",
  "Typescript",
  "C#",
  "MySQL",
  "GitHub",
  "Javascript",
  "HTML",
  "CSS",
  "Express.JS",
  "DotNet",
  "AzureDevOps",
  "Testing",
  "ASP.NETWebAPI",
  "RESTAPI",
  "Postman",
  "GitLab",
  "Bootstrap",
  "UI/UX",
  "NextJS",
  "PrismaORM",
  "PostgreSQL",
  "Tailwindcss",
  "JavaScript",
  "Node.JS",
  "AntDesign",
  "MongoDB",
  "Redux",
];

export default function SkillsCloud() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg shadow-lg w-full max-w-4xl">
        <div className="relative w-full h-80 mb-8">
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: "64px",
              fontWeight: 300,
              color: "rgb(220, 220, 220)",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ReactJS
          </div>

          {skills.map((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI;
            const baseRadius = 100;
            const randomOffset = Math.random() * 80 - 15;
            const radius = baseRadius + randomOffset;
            const x = 50 + (radius * Math.cos(angle)) / 4;
            const y = 50 + (radius * Math.sin(angle)) / 4;
            return (
              <div
                key={skill.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  fontSize: `${Math.max(skill.size, 12)}px`,
                  fontWeight: skill.weight,
                  color: `rgb(${180 + Math.random() * 75}, ${
                    180 + Math.random() * 75
                  }, ${180 + Math.random() * 75})`,
                  left: `${x}%`,
                  top: `${y}%`,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {skill.name}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {buttonSkills.map((skill) => (
            <button
              key={skill}
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300 transition-colors"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
