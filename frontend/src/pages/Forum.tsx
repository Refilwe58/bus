import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getForumChannels, getChannelMessages, sendChannelMessage, getForumUsers } from '../api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare as MessageSquareIcon, Send as SendIcon, Users as UsersIcon, User as UserIcon, Clock as ClockIcon, ChevronDown as ChevronDownIcon, Loader as LoaderIcon } from 'lucide-react';
interface ForumProps {
  onNavigate: (page: string) => void;
}
interface ForumUser {
  id: number;
  name: string;
  status: string;
  avatar: string;
}
interface ForumChannel {
  id: string;
  name: string;
  unread: number;
}
interface ForumMessage {
  id: number;
  userId: number;
  text: string;
  time: string;
  timestamp: string;
  user?: {
    name: string;
    avatar: string;
    status: string;
  };
}
export const Forum: React.FC<ForumProps> = ({
  onNavigate
}) => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [channels, setChannels] = useState<ForumChannel[]>([]);
  const [messages, setMessages] = useState<Record<string, ForumMessage[]>>({});
  const [users, setUsers] = useState<ForumUser[]>([]);
  const [loading, setLoading] = useState({
    channels: true,
    messages: true,
    users: true
  });
  const {
    user
  } = useAuth();
  // Fetch channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await getForumChannels();
        setChannels(response.data);
        setLoading(prev => ({
          ...prev,
          channels: false
        }));
      } catch (err) {
        console.error('Failed to fetch channels:', err);
        setLoading(prev => ({
          ...prev,
          channels: false
        }));
      }
    };
    fetchChannels();
  }, []);
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getForumUsers();
        setUsers(response.data);
        setLoading(prev => ({
          ...prev,
          users: false
        }));
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setLoading(prev => ({
          ...prev,
          users: false
        }));
      }
    };
    fetchUsers();
  }, []);
  // Fetch messages for active channel
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChannel) return;
      setLoading(prev => ({
        ...prev,
        messages: true
      }));
      try {
        const response = await getChannelMessages(activeChannel);
        setMessages(prev => ({
          ...prev,
          [activeChannel]: response.data
        }));
        setLoading(prev => ({
          ...prev,
          messages: false
        }));
      } catch (err) {
        console.error(`Failed to fetch messages for channel ${activeChannel}:`, err);
        setLoading(prev => ({
          ...prev,
          messages: false
        }));
      }
    };
    if (!messages[activeChannel]) {
      fetchMessages();
    } else {
      setLoading(prev => ({
        ...prev,
        messages: false
      }));
    }
  }, [activeChannel, messages]);
  // Simulate receiving a new message via Socket.io
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeChannel === 'general' && messages.general && messages.general.length > 0) {
        const newMessage = {
          id: messages.general[messages.general.length - 1].id + 1,
          userId: 2,
          text: 'By the way, has anyone noticed the new bus stops being installed on Main Street?',
          time: 'Just now',
          timestamp: new Date().toISOString(),
          user: {
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80',
            status: 'online'
          }
        };
        setMessages(prev => ({
          ...prev,
          general: [...(prev.general || []), newMessage]
        }));
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeChannel, messages]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '' || !user) return;
    try {
      const response = await sendChannelMessage(activeChannel, user.id, message);
      setMessages(prev => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), response.data]
      }));
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  const isLoading = loading.channels || loading.users;
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="text-center">
          <LoaderIcon size={48} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading forum data...</p>
        </div>
      </div>;
  }
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Community Forum</h1>
          <p className="text-gray-600">
            Connect with other commuters and get real-time updates about
            Pretoria bus services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar with channels */}
          <div className="md:col-span-1">
            <Card className="mb-4">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center">
                <MessageSquareIcon size={16} className="mr-2" />
                Channels
              </h2>
              <div className="space-y-1">
                {channels.map(channel => <button key={channel.id} className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-left ${activeChannel === channel.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50 text-gray-700'}`} onClick={() => setActiveChannel(channel.id)}>
                    <span># {channel.name}</span>
                    {channel.unread > 0 && <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {channel.unread}
                      </span>}
                  </button>)}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" fullWidth>
                  + Join New Channel
                </Button>
              </div>
            </Card>
            <Card>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-800 flex items-center">
                  <UsersIcon size={16} className="mr-2" />
                  Online Users
                </h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowUsers(!showUsers)}>
                  <ChevronDownIcon size={16} />
                </button>
              </div>
              {showUsers && <div className="space-y-3">
                  {users.filter(user => user.status === 'online').map(user => <div key={user.id} className="flex items-center">
                        <div className="relative">
                          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
                        </div>
                        <span className="ml-2 text-sm">{user.name}</span>
                      </div>)}
                </div>}
            </Card>
          </div>
          {/* Main chat area */}
          <div className="md:col-span-3">
            <Card className="flex flex-col h-[600px]">
              {/* Channel header */}
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-gray-800">
                    # {channels.find(c => c.id === activeChannel)?.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {users.filter(u => u.status === 'online').length} users
                    online
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Channel Info
                </Button>
              </div>
              {/* Messages area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {loading.messages ? <div className="flex items-center justify-center h-full">
                    <LoaderIcon size={24} className="animate-spin text-teal-600" />
                  </div> : messages[activeChannel] && messages[activeChannel].length > 0 ? messages[activeChannel].map(msg => <div key={msg.id} className="flex">
                      <img src={msg.user?.avatar} alt={msg.user?.name} className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0" />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">
                            {msg.user?.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500 flex items-center">
                            <ClockIcon size={12} className="mr-1" />
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{msg.text}</p>
                      </div>
                    </div>) : <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageSquareIcon size={48} className="mb-3 text-gray-300" />
                    <p>No messages yet in this channel.</p>
                    <p className="text-sm">
                      Be the first to start the conversation!
                    </p>
                  </div>}
              </div>
              {/* Message input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  <Button variant="primary" type="submit" className="rounded-l-none">
                    <SendIcon size={16} />
                  </Button>
                </form>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <UserIcon size={12} className="mr-1" />
                  <span>Posting as {user?.name || 'Anonymous'}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};