
import React from 'react';
import { Coffee, Camera, Music, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InterestsSection = () => {
  const interests = [
    { icon: Coffee, title: 'Data Visualization', description: 'Creating compelling stories through interactive dashboards' },
    { icon: Camera, title: 'Machine Learning', description: 'Exploring predictive models and AI applications' },
    { icon: Music, title: 'Open Source', description: 'Contributing to data science and analytics communities' },
    { icon: Plane, title: 'Industry Research', description: 'Staying current with analytics trends across sectors' }
  ];

  return (
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
  );
};

export default InterestsSection;
