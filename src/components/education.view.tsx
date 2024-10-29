import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

const education = [
  {
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "RK University",
    period: "Aug 2021 - Aug 2025",
    cgpa: "8.00",
  },
];

const EducationView = () => {
  return (
    <div>
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
              <p className="text-purple-400 mb-2">{edu.institution}</p>
              <p className="text-sm text-gray-400 mb-2">{edu.period}</p>
              <p className="text-gray-300">CGPA: {edu.cgpa}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default EducationView;
