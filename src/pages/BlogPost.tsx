
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }

      return data as BlogPost | null;
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
          <div className="portfolio-section">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold gradient-text mb-6">Loading...</h1>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
          <div className="portfolio-section">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
                Post Not Found
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/blog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="portfolio-section">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>

            <Card className="overflow-hidden">
              {post.image_url && (
                <div className="w-full h-64 md:h-96">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
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

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  By {post.author}
                </p>

                {post.excerpt && (
                  <div className="text-lg text-gray-700 dark:text-gray-300 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-purple-600">
                    {post.excerpt}
                  </div>
                )}

                <div className="prose dark:prose-invert max-w-none mb-8">
                  {post.content ? (
                    <div 
                      className="rich-text-content text-gray-800 dark:text-gray-200 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      No content available for this post.
                    </p>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
