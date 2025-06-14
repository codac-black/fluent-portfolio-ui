
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  image_url: string | null;
  read_time: string;
  created_at: string;
  updated_at: string;
}

interface FeaturedPostProps {
  post: BlogPost;
  onReadMore: (slug: string) => void;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onReadMore }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="portfolio-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center gradient-text mb-8">Featured Post</h2>
        <Card className="hover-lift overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={post.image_url || "/placeholder.svg"} 
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                  {post.category}
                </span>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.read_time}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => onReadMore(post.slug)}
              >
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedPost;
