import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { UserIcon, KeyIcon, EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-react';
interface LoginProps {
  onNavigate: (page: string) => void;
}
export const Login: React.FC<LoginProps> = ({
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const success = await login(email, password);
      if (success) {
        onNavigate('dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600">Access your Tshwane Connect account</p>
          </div>
          {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertCircleIcon size={18} className="text-red-500 mr-2" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <UserIcon size={16} className="text-gray-500" />
                </div>
                <input id="email" type="email" className="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <KeyIcon size={16} className="text-gray-500" />
                </div>
                <input id="password" type={showPassword ? 'text' : 'password'} className="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon size={16} className="text-gray-500" /> : <EyeIcon size={16} className="text-gray-500" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-teal-600 hover:text-teal-800">
                Forgot Password?
              </button>
            </div>
            <div className="mb-6">
              <Button variant="primary" fullWidth type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button className="text-teal-600 hover:text-teal-800 font-medium" onClick={() => onNavigate('landing')}>
                Register
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>;
};