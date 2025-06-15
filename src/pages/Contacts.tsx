
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
    // For demo, just show a "sent" message
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto pt-12 px-4">
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
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-accent hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
          aria-label="Linkedin"
        >
          <Linkedin />
        </a>
        <a
          href="https://github.com"
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
  );
};

export default Contacts;
