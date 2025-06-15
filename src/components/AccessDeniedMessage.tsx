
import React from "react";

const AccessDeniedMessage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 flex flex-col items-center justify-center px-4">
    <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h2>
      <p className="mb-4">You do not have permission to view the admin panel.</p>
    </div>
  </div>
);

export default AccessDeniedMessage;
