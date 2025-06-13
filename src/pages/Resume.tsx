
import React, { useState, useEffect } from 'react';
import { Download, MapPin, Calendar, Award, ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';

const Resume = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observers = new Map();
    
    const sections = ['summary', 'experience', 'education', 'skills', 'achievements'];
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => [...prev.filter(s => s !== section), section]);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(element);
        observers.set(section, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const workExperience = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      achievements: [
        "Led a team of 5 developers in rebuilding the main product dashboard using React and TypeScript",
        "Improved application performance by 40% through code optimization and lazy loading",
        "Implemented comprehensive testing suite with 95% code coverage using Jest and React Testing Library"
      ]
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      period: "2020 - 2022",
      achievements: [
        "Developed responsive web applications using React, Redux, and Tailwind CSS",
        "Collaborated with UX/UI designers to implement pixel-perfect designs",
        "Built and maintained component library used across 3 different products"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "Digital Agency Pro",
      location: "New York, NY",
      period: "2019 - 2020",
      achievements: [
        "Created custom WordPress themes and plugins for client websites",
        "Optimized website loading speeds resulting in 30% improvement in Core Web Vitals",
        "Mentored 2 junior developers in modern JavaScript development practices"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "California, USA",
      period: "2015 - 2019",
      details: "Graduated Magna Cum Laude, GPA: 3.8/4.0"
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services",
      year: "2023"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      year: "2022"
    },
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      year: "2021"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS"], level: 90 },
    { category: "Backend", items: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB"], level: 75 },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Jest", "Webpack"], level: 85 },
    { category: "Design", items: ["Figma", "Adobe XD", "Responsive Design", "UI/UX"], level: 70 }
  ];

  const achievements = [
    {
      title: "Employee of the Year 2023",
      organization: "TechCorp Solutions",
      description: "Recognized for outstanding performance and leadership in frontend development"
    },
    {
      title: "Open Source Contributor",
      organization: "GitHub",
      description: "Active contributor to popular React libraries with 500+ stars on personal projects"
    },
    {
      title: "Tech Conference Speaker",
      organization: "ReactConf 2023",
      description: "Presented 'Modern State Management in React' to 1000+ developers"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        {/* Header */}
        <div className="portfolio-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">Resume</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Download my full resume or explore my professional journey below
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-5 w-5" />
                Download PDF Resume
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section id="summary" className={`portfolio-section transition-all duration-1000 ${visibleSections.includes('summary') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl text-center gradient-text">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                  Passionate Frontend Developer with 5+ years of experience creating beautiful, responsive web applications. 
                  Specialized in React ecosystem with a strong foundation in TypeScript, modern CSS, and performance optimization. 
                  Proven track record of leading development teams and delivering high-quality solutions that drive business growth.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2" />
                    alex@example.com
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 123-4567
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className={`portfolio-section transition-all duration-1000 delay-200 ${visibleSections.includes('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Work Experience</h2>
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                        <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold">{job.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {job.period}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section id="education" className={`portfolio-section transition-all duration-1000 delay-400 ${visibleSections.includes('education') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Education & Certifications</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600 dark:text-purple-400">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h3 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold">{edu.school}</p>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {edu.period}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {edu.location}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600 dark:text-purple-400">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Matrix */}
        <section id="skills" className={`portfolio-section transition-all duration-1000 delay-600 ${visibleSections.includes('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Technical Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skillCategory, index) => (
                <Card key={index} className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-600 dark:text-purple-400">{skillCategory.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{skillCategory.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: visibleSections.includes('skills') ? `${skillCategory.level}%` : '0%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className={`portfolio-section transition-all duration-1000 delay-800 ${visibleSections.includes('achievements') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Achievements & Awards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover-lift text-center">
                  <CardContent className="p-6">
                    <Award className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">{achievement.organization}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resume;
