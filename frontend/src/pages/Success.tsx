import React from 'react';
import { CheckCircleIcon } from 'lucide-react';

export const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon size={48} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Your top-up has been processed. Thank you for using our service.
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};
