
import React from "react";

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
);

export default LoadingScreen;
