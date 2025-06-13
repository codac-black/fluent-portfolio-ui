
import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-app', name: 'Web Apps' },
    { id: 'e-commerce', name: 'E-commerce' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'saas', name: 'SaaS' },
    { id: 'portfolio', name: 'Portfolio' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TaskFlow Pro',
      description: 'A comprehensive project management platform with real-time collaboration, built with React, Node.js, and Socket.io.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      category: 'web-app',
      tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      demoUrl: 'https://taskflow-demo.com',
      githubUrl: 'https://github.com/alexchen/taskflow',
      featured: true
    },
    {
      id: 2,
      title: 'EcoShop Marketplace',
      description: 'Sustainable shopping platform connecting eco-friendly brands with conscious consumers.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop',
      category: 'e-commerce',
      tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      demoUrl: 'https://ecoshop-demo.com',
      githubUrl: 'https://github.com/alexchen/ecoshop',
      featured: true
    },
    {
      id: 3,
      title: 'MindfulMoments App',
      description: 'Mobile meditation and mindfulness app with guided sessions and progress tracking.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      category: 'mobile',
      tags: ['React Native', 'Expo', 'Firebase', 'Redux'],
      demoUrl: 'https://mindfulmoments-demo.com',
      githubUrl: 'https://github.com/alexchen/mindfulmoments',
      featured: true
    },
    {
      id: 4,
      title: 'DataViz Dashboard',
      description: 'Interactive data visualization dashboard for business analytics with real-time updates.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'saas',
      tags: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      demoUrl: 'https://dataviz-demo.com',
      githubUrl: 'https://github.com/alexchen/dataviz',
      featured: false
    },
    {
      id: 5,
      title: 'Creative Agency Portfolio',
      description: 'Modern portfolio website for a creative agency featuring smooth animations and case studies.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      category: 'portfolio',
      tags: ['Gatsby', 'GSAP', 'Contentful', 'GraphQL'],
      demoUrl: 'https://agency-demo.com',
      githubUrl: 'https://github.com/alexchen/agency-portfolio',
      featured: false
    },
    {
      id: 6,
      title: 'FitTracker SaaS',
      description: 'Comprehensive fitness tracking platform with workout plans, nutrition tracking, and community features.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      category: 'saas',
      tags: ['React', 'Django', 'PostgreSQL', 'Redis'],
      demoUrl: 'https://fittracker-demo.com',
      githubUrl: 'https://github.com/alexchen/fittracker',
      featured: false
    },
    {
      id: 7,
      title: 'BookHaven Store',
      description: 'Online bookstore with advanced search, recommendations, and reading community features.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      category: 'e-commerce',
      tags: ['Angular', 'Node.js', 'MongoDB', 'Elasticsearch'],
      demoUrl: 'https://bookhaven-demo.com',
      githubUrl: 'https://github.com/alexchen/bookhaven',
      featured: false
    },
    {
      id: 8,
      title: 'WeatherWise Mobile',
      description: 'Beautiful weather app with hourly forecasts, weather alerts, and location-based recommendations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      category: 'mobile',
      tags: ['Flutter', 'Dart', 'OpenWeather API', 'SQLite'],
      demoUrl: 'https://weatherwise-demo.com',
      githubUrl: 'https://github.com/alexchen/weatherwise',
      featured: false
    },
    {
      id: 9,
      title: 'CodeCollab IDE',
      description: 'Collaborative online code editor with real-time editing, video chat, and project management.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      category: 'web-app',
      tags: ['React', 'WebRTC', 'Monaco Editor', 'Socket.io'],
      demoUrl: 'https://codecollab-demo.com',
      githubUrl: 'https://github.com/alexchen/codecollab',
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="portfolio-section bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 gradient-text">My Projects</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              A showcase of my latest work, featuring web applications, mobile apps, and SaaS platforms 
              built with modern technologies and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="portfolio-section bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Highlighting some of my most impactful and innovative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="project-card animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" className="flex-1 bg-gradient-portfolio hover:opacity-90">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="w-4 h-4 mr-1" />
                      View Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filters */}
      <section className="portfolio-section bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">All Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my complete portfolio with advanced filtering and search capabilities.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`filter-button ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={project.id} className="project-card animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-portfolio text-white">Featured</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 text-xs bg-gradient-portfolio hover:opacity-90">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Projects Found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
