import React from 'react';
interface FooterProps {
  onNavigate: (page: string) => void;
}
export const Footer: React.FC<FooterProps> = ({
  onNavigate
}) => {
  return <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Tshwane Connect</h3>
            <p className="text-gray-400 text-sm">
              The official digital platform for Tshwane and A Re Yeng bus
              services.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('landing')} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('topup')} className="text-gray-400 hover:text-white transition-colors">
                  Top Up
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('feedback')} className="text-gray-400 hover:text-white transition-colors">
                  Feedback
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Download our mobile app:
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="bg-gray-700 text-xs px-2 py-1 rounded">
                App Store
              </a>
              <a href="#" className="bg-gray-700 text-xs px-2 py-1 rounded">
                Google Play
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Tshwane Connect. All rights reserved.
        </div>
      </div>
    </footer>;
};