import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User as UserIcon, MapPin as MapPinIcon, Bell as BellIcon, Settings as SettingsIcon, CreditCard as CreditCardIcon, Camera as CameraIcon, Edit as EditIcon, Check as CheckIcon, X as XIcon } from 'lucide-react';
interface UserProfileProps {
  onNavigate: (page: string) => void;
}
export const UserProfile: React.FC<UserProfileProps> = ({
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+27 12 345 6789',
    address: '123 Main Street, Pretoria',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  };
  // Mock favorite routes
  const favoriteRoutes = [{
    id: 'A1',
    name: 'Central Station to Suburbs',
    color: '#3B82F6'
  }, {
    id: 'B3',
    name: 'University Route',
    color: '#10B981'
  }, {
    id: 'C2',
    name: 'Business District Loop',
    color: '#F59E0B'
  }];
  // Mock payment methods
  const paymentMethods = [{
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '04/25'
  }, {
    id: 2,
    type: 'Mastercard',
    last4: '5555',
    expiry: '09/24'
  }];
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar with profile image and navigation */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6">
              <div className="relative inline-block mb-4">
                <img src={userData.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-teal-100" />
                <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700">
                  <CameraIcon size={16} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-600 text-sm">{userData.email}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" fullWidth className="mt-2">
                  <UserIcon size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <nav>
                <button className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'personal' ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveTab('personal')}>
                  <UserIcon size={18} className="mr-3" />
                  <span>Personal Information</span>
                </button>
                <button className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'routes' ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveTab('routes')}>
                  <MapPinIcon size={18} className="mr-3" />
                  <span>Favorite Routes</span>
                </button>
                <button className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'notifications' ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveTab('notifications')}>
                  <BellIcon size={18} className="mr-3" />
                  <span>Notification Settings</span>
                </button>
                <button className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'payment' ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveTab('payment')}>
                  <CreditCardIcon size={18} className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                <button className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveTab('settings')}>
                  <SettingsIcon size={18} className="mr-3" />
                  <span>Account Settings</span>
                </button>
              </nav>
            </div>
          </div>
          {/* Right content area */}
          <div className="md:w-2/3">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {activeTab === 'personal' && 'Personal Information'}
                  {activeTab === 'routes' && 'Favorite Routes'}
                  {activeTab === 'notifications' && 'Notification Settings'}
                  {activeTab === 'payment' && 'Payment Methods'}
                  {activeTab === 'settings' && 'Account Settings'}
                </h2>
                {activeTab === 'personal' && <div>
                    {!editMode ? <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        <EditIcon size={14} className="mr-1" />
                        Edit
                      </Button> : <div className="flex space-x-2">
                        <Button variant="primary" size="sm" onClick={() => setEditMode(false)}>
                          <CheckIcon size={14} className="mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                          <XIcon size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </div>}
                  </div>}
              </div>
              {/* Personal Information Tab */}
              {activeTab === 'personal' && <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {editMode ? <input type="text" defaultValue={userData.name} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" /> : <p className="text-gray-800">{userData.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {editMode ? <input type="email" defaultValue={userData.email} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" /> : <p className="text-gray-800">{userData.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      {editMode ? <input type="tel" defaultValue={userData.phone} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" /> : <p className="text-gray-800">{userData.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      {editMode ? <input type="text" defaultValue={userData.address} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" /> : <p className="text-gray-800">{userData.address}</p>}
                    </div>
                  </div>
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium text-gray-800 mb-4">
                      Account Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-gray-500">
                            Last updated 3 months ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-gray-500">
                            Enhance your account security
                          </p>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none">
                          <input type="checkbox" id="toggle-2fa" className="sr-only" />
                          <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Favorite Routes Tab */}
              {activeTab === 'routes' && <div>
                  <p className="text-gray-600 mb-6">
                    Manage your favorite routes to quickly access information
                    and receive targeted notifications.
                  </p>
                  <div className="space-y-3 mb-6">
                    {favoriteRoutes.map(route => <div key={route.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium" style={{
                      backgroundColor: route.color
                    }}>
                            {route.id}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{route.name}</p>
                            <p className="text-xs text-gray-500">
                              Route {route.id}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>)}
                  </div>
                  <Button variant="outline" onClick={() => onNavigate('routes')}>
                    Add More Routes
                  </Button>
                </div>}
              {/* Notification Settings Tab */}
              {activeTab === 'notifications' && <div>
                  <p className="text-gray-600 mb-6">
                    Customize which notifications you receive and how they are
                    delivered.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Route Delays</p>
                        <p className="text-sm text-gray-500">
                          Get notified when your favorite routes are delayed
                        </p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input type="checkbox" id="toggle-delays" className="sr-only" defaultChecked />
                        <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Schedule Changes</p>
                        <p className="text-sm text-gray-500">
                          Notifications about timetable updates
                        </p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input type="checkbox" id="toggle-schedule" className="sr-only" defaultChecked />
                        <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Service Disruptions</p>
                        <p className="text-sm text-gray-500">
                          Immediate alerts about major service issues
                        </p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input type="checkbox" id="toggle-disruptions" className="sr-only" defaultChecked />
                        <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Low Balance Alerts</p>
                        <p className="text-sm text-gray-500">
                          Get notified when your card balance is low
                        </p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input type="checkbox" id="toggle-balance" className="sr-only" defaultChecked />
                        <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Promotions & News</p>
                        <p className="text-sm text-gray-500">
                          Updates about new features and special offers
                        </p>
                      </div>
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input type="checkbox" id="toggle-promo" className="sr-only" />
                        <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium text-gray-800 mb-4">
                      Notification Channels
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input id="push" type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="push" className="ml-2 block text-sm text-gray-700">
                          Push Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="email" type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" defaultChecked />
                        <label htmlFor="email" className="ml-2 block text-sm text-gray-700">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="sms" type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                        <label htmlFor="sms" className="ml-2 block text-sm text-gray-700">
                          SMS
                        </label>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Payment Methods Tab */}
              {activeTab === 'payment' && <div>
                  <p className="text-gray-600 mb-6">
                    Manage your payment methods for quick and secure top-ups.
                  </p>
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map(method => <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className={`w-10 h-6 rounded ${method.type === 'Visa' ? 'bg-blue-600' : 'bg-red-500'} flex items-center justify-center text-white text-xs font-bold`}>
                            {method.type}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">
                              **** **** **** {method.last4}
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            Remove
                          </Button>
                        </div>
                      </div>)}
                  </div>
                  <Button variant="primary" onClick={() => onNavigate('topup')}>
                    <CreditCardIcon size={16} className="mr-2" />
                    Add Payment Method
                  </Button>
                </div>}
              {/* Account Settings Tab */}
              {activeTab === 'settings' && <div>
                  <p className="text-gray-600 mb-6">
                    Manage your account settings and preferences.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">
                        Language Preference
                      </h3>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option value="en">English</option>
                        <option value="af">Afrikaans</option>
                        <option value="zu">isiZulu</option>
                        <option value="xh">isiXhosa</option>
                        <option value="st">Sesotho</option>
                      </select>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-gray-800 mb-3">
                        Data & Privacy
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Location Services</p>
                            <p className="text-sm text-gray-500">
                              Allow access to your location for better service
                            </p>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <input type="checkbox" id="toggle-location" className="sr-only" defaultChecked />
                            <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Usage Statistics</p>
                            <p className="text-sm text-gray-500">
                              Help us improve by sharing anonymous usage data
                            </p>
                          </div>
                          <div className="relative inline-block w-12 align-middle select-none">
                            <input type="checkbox" id="toggle-stats" className="sr-only" defaultChecked />
                            <div className="block h-6 bg-gray-300 rounded-full w-12"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-gray-800 mb-3">
                        Danger Zone
                      </h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          Delete My Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>
          </div>
        </div>
      </div>
    </div>;
};