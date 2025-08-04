import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { NotificationItem } from '../components/NotificationItem';
import { BellIcon, CheckIcon, FilterIcon } from 'lucide-react';
interface NotificationsProps {
  onNavigate: (page: string) => void;
}
export const Notifications: React.FC<NotificationsProps> = ({
  onNavigate
}) => {
  const [filter, setFilter] = useState('all');
  // Mock notification data
  const notifications = [{
    id: 1,
    type: 'alert' as const,
    title: 'Route A3 Delay',
    message: 'Route A3 is experiencing a 15-minute delay due to traffic congestion on Main Road.',
    time: 'Today, 07:45',
    isRead: false
  }, {
    id: 2,
    type: 'info' as const,
    title: 'Weekend Schedule Change',
    message: 'Weekend schedule changes will be in effect from September 1st. Check the updated timetable.',
    time: 'Yesterday, 14:30',
    isRead: true
  }, {
    id: 3,
    type: 'update' as const,
    title: 'Route Modification',
    message: 'Route B7 will be temporarily rerouted via Central Avenue due to road works on Park Street.',
    time: 'Aug 15, 09:12',
    isRead: false
  }, {
    id: 4,
    type: 'info' as const,
    title: 'Card Balance Low',
    message: 'Your card balance is below R50. Consider topping up to avoid any inconvenience.',
    time: 'Aug 14, 18:45',
    isRead: true
  }, {
    id: 5,
    type: 'alert' as const,
    title: 'Service Disruption',
    message: 'Bus services on Route C2 are temporarily suspended due to an incident. Please use alternative routes.',
    time: 'Aug 12, 11:30',
    isRead: true
  }, {
    id: 6,
    type: 'update' as const,
    title: 'New Bus Stops Added',
    message: 'Two new bus stops have been added to Route D4 at University Avenue and Commerce Street.',
    time: 'Aug 10, 08:15',
    isRead: true
  }];
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-600">
              Stay updated with the latest service information
            </p>
          </div>
          <div>
            <Button variant="outline" size="sm">
              <CheckIcon size={16} className="mr-1" />
              Mark All Read
            </Button>
          </div>
        </div>
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center">
              <FilterIcon size={18} className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm">Filter by:</span>
            </div>
            <div className="flex space-x-2">
              <button className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('all')}>
                All
              </button>
              <button className={`px-3 py-1 text-sm rounded-full ${filter === 'unread' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('unread')}>
                Unread
              </button>
              <button className={`px-3 py-1 text-sm rounded-full ${filter === 'alert' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('alert')}>
                Alerts
              </button>
              <button className={`px-3 py-1 text-sm rounded-full ${filter === 'update' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('update')}>
                Updates
              </button>
            </div>
          </div>
          <div>
            {filteredNotifications.length > 0 ? filteredNotifications.map(notification => <NotificationItem key={notification.id} type={notification.type} title={notification.title} message={notification.message} time={notification.time} isRead={notification.isRead} />) : <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <BellIcon size={24} className="text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  No notifications
                </h3>
                <p className="text-gray-500">
                  You don't have any {filter !== 'all' ? filter : ''}{' '}
                  notifications at the moment.
                </p>
              </div>}
          </div>
        </Card>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Want to customize which notifications you receive?
          </p>
          <Button variant="outline" size="sm">
            Notification Settings
          </Button>
        </div>
      </div>
    </div>;
};