import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const projects = [
  {
    name: "First-Issue",
    description:
      "An open-source platform for beginners to contribute to open-source projects.",
    tags: [
      "NextJS",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "ExpressJS",
    ],
    links: {
      live: "https://example.com/first-issue",
      client: "https://github.com/username/first-issue-client",
      server: "https://github.com/username/first-issue-server",
    },
  },
  {
    name: "Intern Management System",
    description:
      "Admin dashboard for managing intern data, tasks, salary, certificates, and events.",
    tags: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "Redux", "Ant Design"],
    links: {
      client: "https://github.com/username/intern-management-client",
      server: "https://github.com/username/intern-management-server",
    },
  },
];

const ProjectsView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(project.links).map(([key, value]) => (
                  <Button key={key} asChild variant="outline" size="sm">
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsView;
