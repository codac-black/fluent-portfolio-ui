
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {
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
      'Web Scraping', 'API Integration', 'Jupyter', 'VS Code', 'AWS', 'GCP'
    ],
    domain: [
      'Solar Energy Analytics', 'Aviation Safety', 'Cybersecurity', 'Supply Chain',
      'Customer Sentiment Analysis', 'IoT Systems', 'Procurement Analytics', 'Risk Assessment'
    ]
  };

  return (
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
  );
};

export default SkillsSection;
