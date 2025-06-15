import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacts', href: '/contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('darkMode', JSON.stringify(!prev));
      return !prev;
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-portfolio rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold gradient-text">Bruno Maisiba</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${
                    location.pathname === item.href 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/blog/admin"
                  className={`nav-link ${
                    location.pathname === '/blog/admin' 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : ''
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Social Links, Auth & Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/codac-black"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/brunomaisiba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:maisibabruno@gmail.com"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Mail size={20} />
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="p-2"
                >
                  <LogOut size={20} />
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <LogIn size={20} />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${
                      location.pathname === item.href 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/blog/admin"
                    className={`nav-link ${
                      location.pathname === '/blog/admin' 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://github.com/codac-black"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/brunomaisiba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="mailto:maisibabruno@gmail.com"
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                  {user ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="p-2"
                    >
                      <LogOut size={20} />
                    </Button>
                  ) : (
                    <Link to="/auth">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                      >
                        <LogIn size={20} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-portfolio rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold gradient-text">Bruno Maisiba</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                Data analytics professional dedicated to transforming raw information into actionable insights that drive business impact. I am passionate about leveraging statistical methods, machine learning, and clear visualizations to help organizations make informed, data-driven decisions.
              </p>
              <a
                href="/assets/Bruno_Maisiba_Bosire_Resume.pdf"
                download
                className="inline-block mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition-colors"
              >
                Download Resume
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/codac-black"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/brunomaisiba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:maisibabruno@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2025 Maisiba Bruno. All rights reserved😯. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
