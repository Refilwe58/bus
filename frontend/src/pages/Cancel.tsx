import React from 'react';
import { XCircleIcon } from 'lucide-react';

export const Cancel: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <XCircleIcon size={48} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          It looks like you canceled the payment. You can try topping up again.
        </p>
        <a
          href="/topup"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Retry Top-Up
        </a>
      </div>
    </div>
  );
};
