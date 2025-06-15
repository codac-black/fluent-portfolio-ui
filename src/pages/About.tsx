
import React from 'react';
import { MapPin, Calendar, Award, Heart, Coffee, Camera, Music, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const About = () => {
  const skills = {
    analytics: [
      'Python', 'SQL', 'R', 'Excel', 'Predictive Modeling', 'Trend Analysis',
      'Forecasting', 'Data Cleaning', 'EDA', 'Feature Engineering', 'Statistical Analysis', 'Machine Learning'
    ],
    visualization: [
      'Tableau', 'Power BI', 'Dashboard Development', 'Data Storytelling', 'KPI Design',
      'Interactive Visualizations', 'Report Automation', 'Business Intelligence', 'Executive Reporting', 'Data Presentation'
    ],
    tools: [
      'DBT', 'Airflow', 'Snowflake', 'DuckDB', 'Git', 'Linux', 'Docker',
      'Web Scraping', 'API Integration', 'Jupyter', 'VS Code', 'AWS'
    ],
    domain: [
      'Solar Energy Analytics', 'Aviation Safety', 'Cybersecurity', 'Supply Chain',
      'Customer Sentiment Analysis', 'IoT Systems', 'Procurement Analytics', 'Risk Assessment'
    ]
  };

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University College',
      year: '2019-2023',
      description: 'Specialized in data structures, algorithms, and statistical computing with focus on data analytics applications.',
      achievements: ['Data Analytics Capstone Project', 'Statistical Computing Excellence', 'Computer Science Honor Society']
    },
    {
      degree: 'British Data Science Certification',
      school: 'British Data Science Institute',
      year: '2025',
      description: 'Advanced certification covering machine learning, statistical analysis, and data visualization techniques.',
      achievements: ['Top 10% Performance', 'Advanced Analytics Project', 'Industry Case Study Excellence']
    }
  ];

  const certifications = [
    { name: 'British Data Science', issuer: 'British Data Science Institute', year: '2025' },
    { name: 'Deloitte Data Analytics & Forensic Technology', issuer: 'Deloitte', year: '2025' },
    { name: 'DBT Analytics Engineering', issuer: 'DBT Labs', year: '2025' },
    { name: 'Excel Advanced Analytics', issuer: 'Microsoft', year: '2025' },
    { name: 'Cybersecurity & Incident Response', issuer: 'Cisco & LinkedIn Learning', year: '2025' },
    { name: 'Ethical Hacking', issuer: 'Cisco', year: '2024' },
    { name: 'Python Data Analytics', issuer: 'Python Institute', year: '2024' },
    { name: 'CCNA Networking & System Security', issuer: 'Cisco', year: '2023' }
  ];

  const interests = [
    { icon: Coffee, title: 'Data Visualization', description: 'Creating compelling stories through interactive dashboards' },
    { icon: Camera, title: 'Machine Learning', description: 'Exploring predictive models and AI applications' },
    { icon: Music, title: 'Open Source', description: 'Contributing to data science and analytics communities' },
    { icon: Plane, title: 'Industry Research', description: 'Staying current with analytics trends across sectors' }
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
                Detail-oriented and results-driven Data Analyst with a BSc in Computer Science and proven
                experience in extracting insights from data, developing predictive models, and building intuitive
                dashboards. Skilled in Python, SQL, Power BI, and Tableau. Adept at applying data science
                techniques to solve real-world business problems across sectors including solar energy, aviation, and cybersecurity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">Global Remote</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-300">8+ Professional Certifications</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Alex working on data analysis"
                  className="rounded-2xl shadow-lg hover-lift"
                />
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop"
                    alt="Data analytics dashboard"
                    className="rounded-2xl shadow-lg hover-lift"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop"
                    alt="Data visualization charts"
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
              I believe data should drive decisions, not assumptions. My mission is to transform raw data 
              into actionable insights that solve real business problems and create meaningful impact. 
              Every analysis I conduct is driven by curiosity, precision, and a commitment to uncovering 
              the stories hidden within the numbers.
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
              A comprehensive data analytics toolkit built through years of hands-on experience across multiple industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={category} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 capitalize gradient-text">
                    {category === 'analytics' ? 'Analytics & Programming' : 
                     category === 'visualization' ? 'Visualization & BI' : 
                     category === 'tools' ? 'Tools & Platforms' : 'Domain Expertise'}
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
              Continuous learning through formal education and professional development in data analytics.
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
            <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
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
            <h2 className="text-4xl font-bold mb-4">Beyond Data</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              When I'm not analyzing data, you'll find me exploring these passions that fuel my analytical mindset.
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
