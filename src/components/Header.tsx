import { useState } from 'react';
import { Bell, X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HeaderProps {
  userName: string;
  isSidebarOpen: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Header({ userName, isSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your booking at Shivajinagar CNG Point is confirmed for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Slot Reminder',
      message: 'Your booking is scheduled in 30 minutes. Please arrive on time.',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Station Available',
      message: 'A new CNG station has opened in Hinjewadi area',
      time: '1 day ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (type) {
      case 'success':
        return `bg-gradient-to-r from-green-${opacity} to-emerald-${opacity}`;
      case 'warning':
        return `bg-gradient-to-r from-orange-${opacity} to-amber-${opacity}`;
      default:
        return `bg-gradient-to-r from-blue-${opacity} to-cyan-${opacity}`;
    }
  };

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-600 to-rose-600 text-white px-6 py-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-white">Welcome, {userName}! 👋</h2>
              <p className="text-sm text-white/80">Manage your CNG bookings with ease</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                className="relative p-2 hover:bg-white/20 rounded-xl transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white">
                    {unreadCount}
                  </Badge>
                )}
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <div className="absolute right-0 top-14 w-96 max-h-[500px] overflow-y-auto shadow-2xl rounded-2xl bg-white border-2 border-purple-200 z-50">
                  <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white">Notifications</h3>
                        <p className="text-sm text-white/80">{unreadCount} unread notifications</p>
                      </div>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              notification.read 
                                ? 'bg-gray-50 border-gray-200' 
                                : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="text-gray-800 text-sm">{notification.title}</h4>
                                  <button
                                    onClick={() => clearNotification(notification.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="text-xs text-purple-600 hover:text-purple-700"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="sticky bottom-0 bg-white border-t-2 border-purple-200 p-3 rounded-b-xl">
                      <Button
                        onClick={() => setNotifications([])}
                        variant="outline"
                        className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                        size="sm"
                      >
                        Clear All Notifications
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-sm">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
