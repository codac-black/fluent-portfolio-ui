import React from 'react';
import type { ReactElement } from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';

const HeroSection = () => {
  return (
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
                <span className="text-gray-600 dark:text-gray-300">2+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-600 dark:text-gray-300">5+ Professional Certifications</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/image.jpeg"
                alt="Bruno working on data analysis"
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
  );
};

export default HeroSection;
