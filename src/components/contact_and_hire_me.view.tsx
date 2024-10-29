import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ContactMeView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
        <form className="space-y-4">
          <Input placeholder="Name" className="bg-gray-800 border-gray-700" />
          <Input
            type="email"
            placeholder="Email"
            className="bg-gray-800 border-gray-700"
          />
          <Textarea
            placeholder="Message"
            rows={4}
            className="bg-gray-800 border-gray-700"
          />
          <Button type="submit">Send Message</Button>
        </form>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-4">Hire Me</h3>
          <p className="text-gray-400 mb-4">
            I&apos;m always open to new opportunities and exciting projects.
            Let&apos;s work together to bring your ideas to life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMeView;
