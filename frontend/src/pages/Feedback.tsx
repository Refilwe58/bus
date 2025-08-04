import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SendIcon, CheckCircleIcon, MessageSquareTextIcon, MapPinIcon, ClockIcon, AlertTriangleIcon, ThumbsUpIcon } from 'lucide-react';
interface FeedbackProps {
  onNavigate: (page: string) => void;
}
export const Feedback: React.FC<FeedbackProps> = ({
  onNavigate
}) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {!submitted ? <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Send Feedback
              </h1>
              <p className="text-gray-600">
                Help us improve our service by sharing your experience
              </p>
            </div>
            <Card className="mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Feedback Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button type="button" className={`p-3 border rounded-md text-center flex flex-col items-center ${feedbackType === 'suggestion' ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'}`} onClick={() => setFeedbackType('suggestion')}>
                      <ThumbsUpIcon size={20} className="mb-1" />
                      <span className="text-sm font-medium">Suggestion</span>
                    </button>
                    <button type="button" className={`p-3 border rounded-md text-center flex flex-col items-center ${feedbackType === 'issue' ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'}`} onClick={() => setFeedbackType('issue')}>
                      <AlertTriangleIcon size={20} className="mb-1" />
                      <span className="text-sm font-medium">Report Issue</span>
                    </button>
                    <button type="button" className={`p-3 border rounded-md text-center flex flex-col items-center ${feedbackType === 'general' ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'}`} onClick={() => setFeedbackType('general')}>
                      <MessageSquareTextIcon size={20} className="mb-1" />
                      <span className="text-sm font-medium">
                        General Comment
                      </span>
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="route">
                    Bus Route (if applicable)
                  </label>
                  <select id="route" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">Select a route</option>
                    <option value="A1">A1 - Central Station to Suburbs</option>
                    <option value="A3">A3 - Downtown Express</option>
                    <option value="B2">B2 - University Route</option>
                    <option value="B7">B7 - Business District Loop</option>
                    <option value="C2">C2 - East-West Connector</option>
                    <option value="D4">D4 - Airport Shuttle</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">
                      Location
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <MapPinIcon size={16} className="text-gray-500" />
                      </div>
                      <input id="location" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Bus stop or location" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="datetime">
                      Date & Time (if applicable)
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <ClockIcon size={16} className="text-gray-500" />
                      </div>
                      <input id="datetime" type="datetime-local" className="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                    Your Feedback
                  </label>
                  <textarea id="message" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Please provide details about your experience or suggestion..." required></textarea>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contact">
                    Contact Information (optional)
                  </label>
                  <input id="contact" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Your email address for follow-up" />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll only use this to follow up on your feedback if needed.
                  </p>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the privacy policy and terms of service
                    </span>
                  </label>
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" type="submit">
                    <SendIcon size={16} className="mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </Card>
          </> : <Card className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircleIcon size={48} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Thank You For Your Feedback!
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your input has been received and will be reviewed by our team. We
              appreciate your help in improving our services.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send Another Feedback
              </Button>
              <Button variant="primary" onClick={() => onNavigate('landing')}>
                Back to Home
              </Button>
            </div>
          </Card>}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">
            Other Ways to Contact Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Customer Support</h4>
              <p className="text-sm text-gray-600">
                Call: 0800-BUS-HELP (0800-287-4357)
                <br />
                Hours: Mon-Fri, 7am - 7pm
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Visit a Service Center</h4>
              <p className="text-sm text-gray-600">
                Find your nearest service center on our website
                <br />
                Hours: Mon-Sat, 8am - 5pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};