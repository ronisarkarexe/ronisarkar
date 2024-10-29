import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Code } from "lucide-react";

const skills = [
  "JavaScript",
  "TypeScript",
  "SQL",
  "Java",
  "C#",
  "CSS",
  "ReactJS",
  "ExpressJS",
  "Prisma ORM",
  "Redis",
  "GraphQL",
  "NodeJS",
  "Firebase",
  "Redux",
  "NextJS",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
];

const OldSkillsView = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex items-center justify-between">
              <span>{skill}</span>
              <Code className="h-4 w-4 text-purple-400" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OldSkillsView;
