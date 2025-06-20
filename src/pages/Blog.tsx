
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogGrid from '@/components/blog/BlogGrid';
import EmptyBlogState from '@/components/blog/EmptyBlogState';
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  // Fetch blog posts from Supabase
  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return data as BlogPost[];
    },
  });

  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
    return ['All', ...uniqueCategories];
  }, [blogPosts]);
  
  // Get all tags from posts
  const allTags = useMemo(() => {
    return Array.from(new Set(blogPosts.flatMap(post => post.tags || [])));
  }, [blogPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [blogPosts, searchTerm, selectedCategory, sortBy]);

  const featuredPost = blogPosts.find(post => post.featured);

  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
          <div className="portfolio-section">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold gradient-text mb-6">Blog</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Loading posts...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
          <div className="portfolio-section">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold gradient-text mb-6">Blog</h1>
              <p className="text-xl text-red-600 dark:text-red-400 mb-8">Error loading posts. Please try again later.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        {/* Header */}
        <div className="portfolio-section">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6">Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Thoughts, tutorials, and insights about data analytics, machine learning, career growth, and technology trends
            </p>
          </div>
        </div>

        {/* Show empty state if no posts */}
        {blogPosts.length === 0 ? (
          <EmptyBlogState />
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <FeaturedPost post={featuredPost} onReadMore={handleReadMore} />
            )}

            {/* Search and Filter */}
            <BlogFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
              allTags={allTags}
            />

            {/* Blog Posts Grid */}
            <BlogGrid
              posts={filteredAndSortedPosts}
              selectedCategory={selectedCategory}
              onReadMore={handleReadMore}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
