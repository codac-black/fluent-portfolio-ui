
import React from 'react';
import { Heart } from 'lucide-react';

const MissionSection = () => {
  return (
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
  );
};

export default MissionSection;
