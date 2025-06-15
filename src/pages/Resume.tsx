
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
      title: "Data Analyst",
      company: "British Airways",
      location: "London, UK",
      period: "January 2025 - Present",
      achievements: [
        "Web scraped customer reviews and performed sentiment analysis using Python to analyze customer feedback",
        "Applied topic modeling to uncover common themes in customer feedback data",
        "Developed comprehensive dashboard for senior management to inform service improvement strategies"
      ]
    },
    {
      title: "Data Security Analyst",
      company: "Daikibo Industrial",
      location: "Remote",
      period: "March 2025",
      achievements: [
        "Analyzed web logs and user patterns to detect unauthorized access and security breaches",
        "Reported critical breach findings that led to timely remediation and improved security posture",
        "Implemented automated monitoring systems for real-time threat detection"
      ]
    },
    {
      title: "Aviation Data Analyst",
      company: "Aviation Safety Consultancy",
      location: "Kenya",
      period: "July 2023 - March 2025",
      achievements: [
        "Analyzed 5,000+ aviation crash reports to identify safety trends and patterns",
        "Created encrypted database system for secure storage of sensitive aviation data",
        "Developed automated threat detection system ensuring compliance with data privacy standards",
        "Performed comprehensive analysis of Kenya Airways customer reviews to track satisfaction trends"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Kenya",
      period: "2019 - 2023",
      details: "Specialized in Data Science and Analytics"
    }
  ];

  const certifications = [
    {
      name: "British Data Science Certification",
      issuer: "British Data Science Institute",
      year: "2025"
    },
    {
      name: "Deloitte Data Analytics & Forensic Technology",
      issuer: "Deloitte",
      year: "2025"
    },
    {
      name: "DBT (Data Build Tool) Certification",
      issuer: "dbt Labs",
      year: "2025"
    },
    {
      name: "Cybersecurity & Incident Response",
      issuer: "Cisco & LinkedIn Learning",
      year: "2025"
    },
    {
      name: "Ethical Hacking Certification",
      issuer: "Cisco",
      year: "2024"
    },
    {
      name: "Python Programming Certification",
      issuer: "Python Institute",
      year: "2024"
    },
    {
      name: "CCNA Networking & System Security",
      issuer: "Cisco",
      year: "2023"
    }
  ];

  const skills = [
    { 
      category: "Programming & Analysis", 
      items: ["Python", "SQL", "R", "Excel", "Data Processing", "Automation"], 
      level: 95 
    },
    { 
      category: "Visualization & BI", 
      items: ["Tableau", "Power BI", "Dashboard Development", "Data Storytelling"], 
      level: 90 
    },
    { 
      category: "Data Engineering", 
      items: ["DBT", "Airflow", "Snowflake", "DuckDB", "ETL/ELT Pipelines"], 
      level: 85 
    },
    { 
      category: "Analytics & ML", 
      items: ["Predictive Modeling", "Trend Analysis", "Forecasting", "Feature Engineering", "EDA"], 
      level: 88 
    },
    { 
      category: "Tools & Infrastructure", 
      items: ["Git", "Linux", "Docker", "Web Scraping", "API Integration"], 
      level: 80 
    }
  ];

  const achievements = [
    {
      title: "Data-Driven Security Improvement",
      organization: "Daikibo Industrial",
      description: "Identified critical security vulnerabilities through log analysis, leading to 40% reduction in false-positive alerts"
    },
    {
      title: "IoT Water System Optimization",
      organization: "Smart Water Initiative",
      description: "Designed secure IoT monitoring system that reduced water wastage by 30% through predictive analytics"
    },
    {
      title: "Aviation Safety Enhancement",
      organization: "Aviation Safety Consultancy",
      description: "Analyzed 5,000+ incident reports to improve safety protocols and compliance standards"
    }
  ];

  const projects = [
    {
      title: "Procurement KPI Analysis",
      period: "June 2025",
      description: "Analyzed supply chain bottlenecks, engineered procurement KPIs, predicted savings using ML models, and ranked suppliers by reliability to uncover cost optimization opportunities"
    },
    {
      title: "Security Log Monitoring Platform",
      period: "December 2024",
      description: "Built automated log analysis system for real-time monitoring, designed visualization dashboards for alerts and system events, reducing false-positive alerts by 40% and improving response time by 60%"
    },
    {
      title: "IoT Smart Water System Security & Monitoring",
      period: "January 2024 - April 2024",
      description: "Designed secure IoT system reducing water wastage by 30%, installed and maintained sensor networks, conducted system diagnostics and penetration testing for reliability and security"
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
              Download my full resume or explore my data analytics journey below
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
                  Detail-oriented and results-driven Data Analyst with a BSc in Computer Science and proven 
                  experience in extracting insights from data, developing predictive models, and building intuitive 
                  dashboards. Skilled in Python, SQL, Power BI, and Tableau. Adept at applying data science 
                  techniques to solve real-world business problems across sectors including solar energy, aviation, 
                  and cybersecurity. Passionate about driving decisions through data.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    London, UK / Remote
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 mr-2" />
                    dataanalyst@example.com
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    +44 (0) 20 1234 5678
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

            {/* Key Projects Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center gradient-text mb-8">Key Projects</h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h4>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-1 md:mt-0">
                          <Calendar className="h-4 w-4 mr-2" />
                          {project.period}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
            <div className="grid md:grid-cols-2 gap-6">
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
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Key Achievements</h2>
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
