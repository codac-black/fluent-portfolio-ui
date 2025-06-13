
import React from 'react';
import { MapPin, Calendar, Award, Heart, Coffee, Camera, Music, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const About = () => {
  const skills = {
    frontend: [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Angular',
      'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Material-UI', 'Chakra UI'
    ],
    backend: [
      'Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'PostgreSQL',
      'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Socket.io', 'JWT'
    ],
    tools: [
      'Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Figma', 'Adobe XD',
      'Webpack', 'Vite', 'Jest', 'Cypress', 'Storybook', 'Linux'
    ],
    design: [
      'UI/UX Design', 'Responsive Design', 'Accessibility', 'Wireframing',
      'Prototyping', 'Design Systems', 'Color Theory', 'Typography'
    ]
  };

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Stanford University',
      year: '2018-2022',
      description: 'Graduated Magna Cum Laude with a focus on Web Technologies and Human-Computer Interaction.',
      achievements: ['Dean\'s List (4 semesters)', 'CS Department Honors', 'Phi Beta Kappa']
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      school: 'General Assembly',
      year: '2017',
      description: 'Intensive 12-week program covering modern web development technologies and best practices.',
      achievements: ['Top 5% of class', 'Best Final Project Award', 'Teaching Assistant role']
    }
  ];

  const certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'React Developer Certification', issuer: 'Meta', year: '2023' },
    { name: 'Google UX Design Certificate', issuer: 'Google', year: '2022' },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB', year: '2022' }
  ];

  const interests = [
    { icon: Coffee, title: 'Coffee Brewing', description: 'Exploring different brewing methods and coffee origins' },
    { icon: Camera, title: 'Photography', description: 'Capturing moments and beautiful landscapes during travels' },
    { icon: Music, title: 'Music Production', description: 'Creating electronic music and learning new instruments' },
    { icon: Plane, title: 'Travel', description: 'Exploring new cultures and gaining fresh perspectives' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="portfolio-section bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl font-bold mb-6 gradient-text">About Me</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that make a difference. Based in San Francisco, I specialize 
                in building scalable web applications using modern technologies.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">AWS Certified Developer</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Alex working"
                  className="rounded-2xl shadow-lg hover-lift"
                />
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=240&fit=crop"
                    alt="Workspace"
                    className="rounded-2xl shadow-lg hover-lift"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop"
                    alt="Team collaboration"
                    className="rounded-2xl shadow-lg hover-lift"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="portfolio-section bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Heart className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 gradient-text">My Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe technology should enhance human experiences, not complicate them. 
              My mission is to create intuitive, accessible, and beautiful digital solutions 
              that solve real problems and bring joy to users. Every line of code I write 
              is driven by empathy, curiosity, and a commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="portfolio-section bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Skills & Technologies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={category} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 capitalize gradient-text">
                    {category === 'frontend' ? 'Frontend' : 
                     category === 'backend' ? 'Backend' : 
                     category === 'tools' ? 'Tools & DevOps' : 'Design'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="text-xs hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="portfolio-section bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Education & Certifications</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Continuous learning through formal education and professional development.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={edu.degree} className="timeline-item animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover-lift">
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{edu.degree}</h4>
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{edu.school}</span>
                      <span className="text-gray-500 dark:text-gray-400">{edu.year}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement) => (
                        <Badge key={achievement} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={cert.name} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold mb-1 text-gray-900 dark:text-white">{cert.name}</h4>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">{cert.issuer}</p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="portfolio-section bg-gradient-portfolio text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Beyond Coding</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              When I'm not crafting code, you'll find me exploring these passions that fuel my creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <Card key={interest.title} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6 text-center">
                  <interest.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="font-bold mb-2 text-white">{interest.title}</h3>
                  <p className="text-sm opacity-90">{interest.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
