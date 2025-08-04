import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getUserProfile, getUserTrips, getUserNotifications } from '../api';
import { useAuth } from '../context/AuthContext';
import { CreditCardIcon, ClockIcon, HistoryIcon, TrendingUpIcon, CalendarIcon, MapIcon, Loader as LoaderIcon } from 'lucide-react';
interface DashboardProps {
  onNavigate: (page: string) => void;
}
interface UserData {
  name: string;
  balance: number;
  cardNumber: string;
  lastTopUp: {
    amount: number;
    date: string;
  };
}
interface TripData {
  userId: number;
  routeId: string;
  routeName: string;
  timestamp: string;
  amount: number;
}
interface NotificationData {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  icon: string;
  routeId?: string;
}
export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [trips, setTrips] = useState<TripData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState({
    user: true,
    trips: true,
    notifications: true
  });
  const {
    user
  } = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const response = await getUserProfile(user.id);
        setUserData(response.data);
        setLoading(prev => ({
          ...prev,
          user: false
        }));
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setLoading(prev => ({
          ...prev,
          user: false
        }));
      }
    };
    const fetchTrips = async () => {
      if (!user) return;
      try {
        const response = await getUserTrips(user.id);
        setTrips(response.data);
        setLoading(prev => ({
          ...prev,
          trips: false
        }));
      } catch (err) {
        console.error('Failed to fetch trips:', err);
        setLoading(prev => ({
          ...prev,
          trips: false
        }));
      }
    };
    const fetchNotifications = async () => {
      if (!user) return;
      try {
        const response = await getUserNotifications(user.id);
        setNotifications(response.data);
        setLoading(prev => ({
          ...prev,
          notifications: false
        }));
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        setLoading(prev => ({
          ...prev,
          notifications: false
        }));
      }
    };
    fetchUserData();
    fetchTrips();
    fetchNotifications();
  }, [user]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA');
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const isYesterday = (dateString: string) => {
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
  };
  const formatTimestamp = (dateString: string) => {
    if (isToday(dateString)) {
      return `Today, ${formatTime(dateString)}`;
    } else if (isYesterday(dateString)) {
      return `Yesterday, ${formatTime(dateString)}`;
    } else {
      return `${formatDate(dateString)}, ${formatTime(dateString)}`;
    }
  };
  const isLoading = loading.user || loading.trips || loading.notifications;
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="text-center">
          <LoaderIcon size={48} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>;
  }
  return <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {userData?.name || user?.name}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" onClick={() => onNavigate('topup')}>
            <CreditCardIcon size={16} className="mr-2" />
            Top Up Card
          </Button>
        </div>
      </div>
      {/* Card Balance Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-100">Current Balance</p>
              <h2 className="text-3xl font-bold mt-1">
                R {userData?.balance.toFixed(2)}
              </h2>
            </div>
            <div className="bg-white p-2 rounded-full">
              <CreditCardIcon size={24} className="text-teal-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p className="text-teal-100">
              Card Number: **** **** **** {userData?.cardNumber.slice(-4)}
            </p>
            <p className="text-teal-100 mt-1">
              Last Top-Up: R {userData?.lastTopUp.amount.toFixed(2)} on{' '}
              {formatDate(userData?.lastTopUp.date || '')}
            </p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="border-white text-white hover:bg-teal-700" onClick={() => onNavigate('topup')}>
              Top Up Now
            </Button>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500">Recent Activity</p>
              <h3 className="text-xl font-semibold mt-1">
                Last {trips.length} Trips
              </h3>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <HistoryIcon size={20} className="text-gray-600" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {trips.map((trip, index) => <div key={index} className="flex justify-between text-sm">
                <div className="flex items-center">
                  <ClockIcon size={14} className="text-gray-400 mr-1" />
                  <span>{formatTimestamp(trip.timestamp)}</span>
                </div>
                <span className="font-medium">R {trip.amount.toFixed(2)}</span>
              </div>)}
            {trips.length === 0 && <p className="text-sm text-gray-500">No recent trips found</p>}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-teal-600 text-sm font-medium hover:text-teal-800">
              View All Activity →
            </button>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500">Usage Summary</p>
              <h3 className="text-xl font-semibold mt-1">This Month</h3>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <TrendingUpIcon size={20} className="text-gray-600" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Trips Taken</span>
                <span className="font-medium">24 / 40</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-600 h-2.5 rounded-full" style={{
                width: '60%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Budget Used</span>
                <span className="font-medium">R 204 / R 350</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-600 h-2.5 rounded-full" style={{
                width: '58%'
              }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>
              You've saved approximately R 146 compared to your monthly budget.
            </p>
          </div>
        </Card>
      </div>
      {/* Notifications Preview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Notifications
          </h2>
          <button className="text-teal-600 text-sm font-medium hover:text-teal-800" onClick={() => onNavigate('notifications')}>
            View All →
          </button>
        </div>
        <Card>
          <div className="space-y-4">
            {notifications.slice(0, 2).map(notification => <div key={notification.id} className={`flex items-start p-3 ${notification.type === 'delay' ? 'bg-yellow-50' : notification.type === 'schedule' ? 'bg-blue-50' : 'bg-gray-50'} rounded-md`}>
                <div className="flex-shrink-0 mr-3">
                  <div className={`${notification.type === 'delay' ? 'bg-yellow-100' : notification.type === 'schedule' ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-full`}>
                    {notification.icon === 'clock' && <ClockIcon size={18} className={notification.type === 'delay' ? 'text-yellow-600' : 'text-gray-600'} />}
                    {notification.icon === 'calendar' && <CalendarIcon size={18} className="text-blue-600" />}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>)}
            {notifications.length === 0 && <p className="text-sm text-gray-500 p-3">
                No recent notifications
              </p>}
          </div>
        </Card>
      </div>
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow text-center" onClick={() => onNavigate('topup')}>
            <div className="flex justify-center mb-2">
              <CreditCardIcon size={24} className="text-teal-600" />
            </div>
            <span className="block text-sm font-medium">Top Up Card</span>
          </button>
          <button className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow text-center">
            <div className="flex justify-center mb-2">
              <HistoryIcon size={24} className="text-teal-600" />
            </div>
            <span className="block text-sm font-medium">Trip History</span>
          </button>
          <button className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow text-center" onClick={() => onNavigate('routes')}>
            <div className="flex justify-center mb-2">
              <MapIcon size={24} className="text-teal-600" />
            </div>
            <span className="block text-sm font-medium">Route Map</span>
          </button>
          <button className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow text-center" onClick={() => onNavigate('feedback')}>
            <div className="flex justify-center mb-2">
              <CalendarIcon size={24} className="text-teal-600" />
            </div>
            <span className="block text-sm font-medium">Send Feedback</span>
          </button>
        </div>
      </div>
    </div>;
};