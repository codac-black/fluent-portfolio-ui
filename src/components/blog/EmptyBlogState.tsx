
import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

const EmptyBlogState: React.FC = () => {
  return (
    <section className="portfolio-section">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="p-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Plus className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Blog Posts Yet</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              This blog is ready to go! Posts will appear here once they're published.
            </p>
            <div className="text-gray-500 dark:text-gray-400">
              <p>Stay tuned for upcoming articles about:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Data Analytics', 'Machine Learning', 'Cybersecurity', 'Career Tips', 'Tech Tutorials'].map((topic) => (
                  <span key={topic} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EmptyBlogState;
