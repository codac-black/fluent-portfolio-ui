
import React, { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative max-w-2xl mx-auto pt-12 px-4 min-h-[calc(100vh-100px)] flex items-center">
      {/* Animated Background Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="blob bg-gradient-to-br from-purple-300 via-indigo-200 to-pink-200 w-72 h-72 left-[-80px] top-0 opacity-60"></div>
        <div className="blob bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-100 w-52 h-52 right-[-60px] bottom-10 opacity-50"></div>
        <div className="blob bg-gradient-to-bl from-blue-200 via-purple-100 to-pink-100 w-36 h-36 left-1/2 -translate-x-1/2 top-32 opacity-40"></div>
      </div>

      {/* Real Content */}
      <div className="relative z-10 w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Contact Me</h1>
        <p className="text-muted-foreground text-center mb-8">
          Want to get in touch? Fill out the form below or reach out via social links.
        </p>

        <div className="flex justify-center mb-6 space-x-4">
          <a
            href="mailto:alex@example.com"
            className="p-2 rounded-full bg-accent hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            aria-label="Email"
          >
            <Mail />
          </a>
          <a
            href="https://www.linkedin.com/in/brunomaisiba"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-accent hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            aria-label="Linkedin"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/codac-black"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-accent hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            aria-label="Github"
          >
            <Github />
          </a>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-md">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-xl font-semibold mb-2">Thank you!</div>
              <div className="text-muted-foreground">Your message has been sent.</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="message">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;

