
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EducationSection = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Kabarak University',
      year: '2020-2024',
      description: 'Specialized in data structures, algorithms, and statistical computing with focus on data analytics applications.',
      achievements: ['Data Analytics Capstone Project', 'Statistical Computing Excellence', 'Computer Science Honor Society']
    },
    {
      degree: 'British Data Science Certification',
      school: 'Forage',
      year: '2025',
      description: 'Advanced certification covering machine learning, statistical analysis, and data visualization techniques.',
      achievements: ['Top 10% Performance', 'Advanced Analytics Project', 'Industry Case Study Excellence']
    }
  ];

  const certifications = [
    { name: 'British Data Science', issuer: 'Forage', year: '2025' },
    { name: 'Deloitte Data Analytics & Forensic Technology', issuer: 'Deloitte', year: '2025' },
    { name: 'DBT Analytics Engineering', issuer: 'Data Talk', year: '2025' },
    { name: 'Excel Advanced Analytics', issuer: 'Datacamp', year: '2025' },
    { name: 'Cybersecurity & Incident Response', issuer: 'LinkedIn Learning', year: '2025' },
    { name: 'Ethical Hacking', issuer: 'Cisco', year: '2024' },
    { name: 'Python Data Analytics', issuer: 'Python Institute', year: '2024' },
    { name: 'CCNA Networking & System Security', issuer: 'Cisco', year: '2023' }
  ];

  return (
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
  );
};

export default EducationSection;
