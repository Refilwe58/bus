import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from "react-router-dom";
import { CreditCardIcon, BellIcon, MessageSquareTextIcon, ShieldCheckIcon, ClockIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react';
interface LandingPageProps {
  onNavigate: (page: string) => void;
}
export const LandingPage: React.FC= () => {
  const navigate = useNavigate();
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Tshwane Connect
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-teal-100">
                Your digital companion for Tshwane and A Re Yeng bus services
              </p>
              <p className="mb-8 text-teal-100 max-w-lg">
                Simplifying your commute with online card top-ups, real-time
                notifications, and a direct line to service improvements.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" className="bg-white text-teal-600 hover:bg-teal-100" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-teal-700" onClick={() => navigate('/feedback')}>
                  Send Feedback
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Tshwane Bus" className="rounded-lg shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <CreditCardIcon size={32} className="text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Online Top-Up</h3>
              <p className="text-gray-600">
                Conveniently top up your bus card from anywhere, anytime without
                visiting terminals.
              </p>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <BellIcon size={32} className="text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Notifications</h3>
              <p className="text-gray-600">
                Stay informed with real-time updates about delays, schedule
                changes, and route modifications.
              </p>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-100 rounded-full">
                  <MessageSquareTextIcon size={32} className="text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feedback System</h3>
              <p className="text-gray-600">
                Share your experiences and suggestions to help improve the bus
                service.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600 text-sm">
                Sign up securely with your Google account or email.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="font-semibold mb-2">Link Your Card</h3>
              <p className="text-gray-600 text-sm">
                Connect your existing bus card to your account.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="font-semibold mb-2">Top Up Online</h3>
              <p className="text-gray-600 text-sm">
                Add value to your card using various payment methods.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
              </div>
              <h3 className="font-semibold mb-2">Ride with Ease</h3>
              <p className="text-gray-600 text-sm">
                Enjoy your commute with real-time updates and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <ShieldCheckIcon size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your account is protected with Google OAuth and
                  industry-standard security measures.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <ClockIcon size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Time-Saving</h3>
                <p className="text-gray-600">
                  No more waiting in lines at terminals to top up your card or
                  check balances.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <BellIcon size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stay Informed</h3>
                <p className="text-gray-600">
                  Get real-time notifications about service changes that might
                  affect your commute.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <MapPinIcon size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Route Optimization</h3>
                <p className="text-gray-600">
                  Access updated route information to plan your journey more
                  efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Commute?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of commuters who are already enjoying the convenience
            of Tshwane Connect.
          </p>
          <Button variant="primary" size="lg" className="bg-white text-teal-600 hover:bg-teal-100" onClick={() => onNavigate('login')}>
            Get Started Now
          </Button>
        </div>
      </section>
    </div>;
};