
import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, Tag, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

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
              Thoughts, tutorials, and insights about web development, career growth, and technology trends
            </p>
          </div>
        </div>

        {/* Show empty state if no posts */}
        {blogPosts.length === 0 ? (
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
                      {['Web Development', 'React', 'TypeScript', 'Career Tips', 'Tech Tutorials'].map((topic) => (
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
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="portfolio-section">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center gradient-text mb-8">Featured Post</h2>
                  <Card className="hover-lift overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={featuredPost.image_url || "/placeholder.svg"} 
                          alt={featuredPost.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                            {featuredPost.category}
                          </span>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(featuredPost.created_at)}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            {featuredPost.read_time}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {featuredPost.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredPost.tags?.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            {/* Search and Filter */}
            <section className="portfolio-section">
              <div className="max-w-6xl mx-auto">
                <Card className="p-6 mb-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Category Filter */}
                    <div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sort */}
                    <div>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="alphabetical">Alphabetical</option>
                      </select>
                    </div>
                  </div>

                  {/* Tag Cloud */}
                  {allTags.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Popular Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchTerm(tag)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="portfolio-section">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text">
                    {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                  </h2>
                  <span className="text-gray-600 dark:text-gray-300">
                    {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredAndSortedPosts.length === 0 ? (
                  <Card className="p-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try adjusting your search terms or category filter
                    </p>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedPosts.map((post) => (
                      <Card key={post.id} className="blog-card">
                        <div className="relative">
                          <img 
                            src={post.image_url || "/placeholder.svg"} 
                            alt={post.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(post.created_at)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.read_time}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags?.slice(0, 3).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <Button variant="outline" className="w-full">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
