
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code, Palette, Globe, Zap, Users, Award, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Index = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  const skills = [
    'Data Analyst',
    'Python Developer',
    'SQL Expert',
    'Dashboard Designer',
    'Business Intelligence'
  ];

  const techSkills = [
    { name: 'Python', level: 95, icon: '🐍' },
    { name: 'SQL', level: 92, icon: '🗄️' },
    { name: 'Tableau', level: 88, icon: '📊' },
    { name: 'Power BI', level: 85, icon: '📈' },
    { name: 'Excel', level: 90, icon: '📋' },
    { name: 'DBT', level: 80, icon: '🔧' }
  ];

  const stats = [
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'GitHub Stars', value: 1200, suffix: '+' }
  ];

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that follows best practices.'
    },
    {
      icon: Palette,
      title: 'Modern Design',
      description: 'Creating beautiful, intuitive interfaces with attention to user experience.'
    },
    {
      icon: Globe,
      title: 'Responsive Web',
      description: 'Building applications that work seamlessly across all devices and platforms.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and search engine visibility.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const CountUpNumber = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsVisible) return;

      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(end * percentage));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration, statsVisible]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="blob w-72 h-72 bg-purple-300 top-20 left-20"></div>
          <div className="blob w-96 h-96 bg-pink-300 top-40 right-20 animation-delay-2000"></div>
          <div className="blob w-64 h-64 bg-blue-300 bottom-20 left-1/2 animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Hero Content */}
            <div className="animate-fade-in-up">
              <div className="mb-6">
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                  👋 Welcome to my portfolio
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text">Bruno Maisiba</span>
              </h1>
              
              <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 h-12">
                <span className="typing-animation">
                  {skills[currentSkill]}
                </span>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                I transform raw data into actionable insights through advanced analytics, machine learning, and interactive dashboards. Combining statistical expertise with business acumen to drive data-driven decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects">
                  <Button size="lg" className="bg-gradient-portfolio hover:opacity-90 text-white group">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-in-right">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Image Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                    alt="Bruno Maisiba - Data Analyst"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-portfolio rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                  <Code className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Palette className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="portfolio-section bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Data Analytics Skills</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Proficient in modern data tools and technologies, constantly learning and adapting to new analytical frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {techSkills.map((skill, index) => (
              <Card key={skill.name} className="skill-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 bg-gradient-portfolio rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section id="stats-section" className="portfolio-section bg-gradient-portfolio text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Numbers That Matter</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Every project is a step forward in my journey of creating impactful digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CountUpNumber end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-section bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life. I'm always excited to work on new challenges and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-portfolio hover:opacity-90 text-white">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2">
                  View Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
