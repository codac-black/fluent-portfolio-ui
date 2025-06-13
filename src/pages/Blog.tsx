
import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience. This comprehensive guide covers best practices, patterns, and tools.",
      content: "TypeScript has become an essential tool for building robust React applications...",
      category: "React",
      tags: ["TypeScript", "React", "Best Practices"],
      author: "Alex Chen",
      publishDate: "2024-03-15",
      readTime: "8 min read",
      featured: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Modern CSS Techniques: Grid, Flexbox, and Beyond",
      excerpt: "Explore the latest CSS features and techniques that will revolutionize your frontend development workflow. From CSS Grid to custom properties, discover what's possible.",
      content: "Modern CSS has evolved tremendously in recent years...",
      category: "CSS",
      tags: ["CSS", "Grid", "Flexbox", "Modern CSS"],
      author: "Alex Chen",
      publishDate: "2024-03-10",
      readTime: "6 min read",
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Career Growth Tips for Frontend Developers",
      excerpt: "Navigate your frontend development career with these proven strategies. Learn how to level up your skills, build a strong portfolio, and land your dream job.",
      content: "The frontend development landscape is constantly evolving...",
      category: "Career",
      tags: ["Career", "Frontend", "Professional Development"],
      author: "Alex Chen",
      publishDate: "2024-03-05",
      readTime: "10 min read",
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization Techniques",
      excerpt: "Boost your JavaScript application performance with these advanced optimization techniques. Learn about bundle splitting, lazy loading, and memory management.",
      content: "Performance is crucial for modern web applications...",
      category: "JavaScript",
      tags: ["JavaScript", "Performance", "Optimization"],
      author: "Alex Chen",
      publishDate: "2024-02-28",
      readTime: "12 min read",
      featured: true,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Building a Design System with Tailwind CSS",
      excerpt: "Create consistent, maintainable designs across your projects with a custom design system built on Tailwind CSS. Learn component architecture and theming strategies.",
      content: "Design systems are essential for maintaining consistency...",
      category: "Design",
      tags: ["Tailwind CSS", "Design System", "UI/UX"],
      author: "Alex Chen",
      publishDate: "2024-02-20",
      readTime: "9 min read",
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Introduction to Next.js 14: App Router and Server Components",
      excerpt: "Dive into the latest features of Next.js 14 including the new App Router, Server Components, and improved performance optimizations.",
      content: "Next.js 14 introduces groundbreaking features...",
      category: "Next.js",
      tags: ["Next.js", "React", "Server Components"],
      author: "Alex Chen",
      publishDate: "2024-02-15",
      readTime: "7 min read",
      featured: false,
      image: "/placeholder.svg"
    }
  ];

  const categories = ['All', 'React', 'JavaScript', 'CSS', 'Next.js', 'Career', 'Design', 'Tutorials'];
  
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredPost = blogPosts.find(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

        {/* Featured Post */}
        {featuredPost && (
          <section className="portfolio-section">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center gradient-text mb-8">Featured Post</h2>
              <Card className="hover-lift overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={featuredPost.image} 
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
                        {formatDate(featuredPost.publishDate)}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
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
                        src={post.image} 
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
                          {formatDate(post.publishDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
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
      </div>
    </Layout>
  );
};

export default Blog;
