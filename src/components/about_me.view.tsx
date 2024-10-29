import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { User } from "lucide-react";
import Image from "next/image";

const AboutMeView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="w-64 h-64 mx-auto bg-purple-500 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/placeholder.svg?height=256&width=256"
            alt="Roni Chandra Sarkar"
            className="w-full h-full object-cover"
            width={256}
            height={256}
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-gray-800 rounded-full p-4 shadow-lg">
          <User className="w-8 h-8 text-purple-400" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <p className="text-gray-300 mb-4">
              Hello! I&aposm Roni, a passionate Full Stack Developer with a knack
              for creating innovative web solutions. With a strong foundation in
              both front-end and back-end technologies, I thrive on turning
              complex problems into elegant, efficient code.
            </p>
            <p className="text-gray-300 mb-4">
              My journey in tech began with a curiosity-driven exploration of
              web development, which quickly turned into a full-fledged passion.
              Today, I leverage my skills in JavaScript, React, Node.js, and
              various other technologies to build robust, scalable applications
              that make a difference.
            </p>
            <p className="text-gray-300">
              When I&aposm not coding, you can find me contributing to open-source
              projects, attending tech meetups, or exploring the latest trends
              in web development. I&aposm always excited about learning new
              technologies and pushing the boundaries of what&aposs possible on the
              web.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutMeView;
