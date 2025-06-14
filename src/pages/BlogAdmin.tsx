
import React from 'react';
import Layout from '@/components/Layout';
import BlogAdmin from '@/components/BlogAdmin';

const BlogAdminPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="portfolio-section">
          <BlogAdmin />
        </div>
      </div>
    </Layout>
  );
};

export default BlogAdminPage;
