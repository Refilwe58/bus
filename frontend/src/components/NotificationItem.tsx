import React from 'react';
import { AlertCircleIcon, InfoIcon, ClockIcon } from 'lucide-react';
interface NotificationItemProps {
  type: 'alert' | 'info' | 'update';
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}
export const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  title,
  message,
  time,
  isRead = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'alert':
        return <AlertCircleIcon className="text-red-500" size={20} />;
      case 'info':
        return <InfoIcon className="text-blue-500" size={20} />;
      case 'update':
        return <ClockIcon className="text-yellow-500" size={20} />;
      default:
        return <InfoIcon className="text-blue-500" size={20} />;
    }
  };
  return <div className={`p-4 border-b ${isRead ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        {!isRead && <div className="flex-shrink-0 ml-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>}
      </div>
    </div>;
};