import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const awards = [
  {
    name: "Arch-A-Thon (Web Development)",
    description:
      "Led a team in developing a campus-based web solution aimed at delivering food within 20 minutes.",
    duration: "24-hours Hackathon",
  },
  {
    name: "WebX (RK University)",
    description: "Build a Website (5th Rank)",
    duration: "3-hours Hackathon",
  },
  {
    name: "Techathon 2.0 (Gateway Group of Companies)",
    description:
      "Teamwork and we built a meeting scheduling platform. There are 5 members with me. My role was backend dev.",
    duration: "36-hours Hackathon",
  },
];

const HonorsAndAwardView = () => {
  return (
    <div className="space-y-6">
      {awards.map((award, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{award.name}</h3>
              <p className="text-purple-400 mb-2">{award.duration}</p>
              <p className="text-gray-300">{award.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default HonorsAndAwardView;
