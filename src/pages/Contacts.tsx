import React, { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get user's IP address and user agent
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;
      const userAgent = navigator.userAgent;

      // Insert the message into Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: form.name,
            email: form.email,
            message: form.message,
            ip_address: ipAddress,
            user_agent: userAgent
          }
        ]);

      if (error) throw error;

      // Show success message
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className="relative min-h-screen">
        <div className="relative max-w-2xl mx-auto px-4 pt-24 pb-12">
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
                href="mailto:maisibabruno@gmail.com"
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

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
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
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contacts;

