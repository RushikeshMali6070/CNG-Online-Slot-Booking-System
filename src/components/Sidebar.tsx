import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  LayoutDashboard, 
  Clock, 
  Calendar, 
  User, 
  Settings, 
  HelpCircle, 
  Phone,
  Menu,
  X,
  Zap,
  MapPin,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  userName: string;
  currentLocation: string;
  onLocationChange: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ activeView, onViewChange, onLogout, userName, currentLocation, onLocationChange, isOpen, onToggle }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-cyan-500 to-teal-500' },
    { id: 'timeslot', label: 'Time Slots', icon: Clock, gradient: 'from-orange-500 to-amber-500' },
    { id: 'mybookings', label: 'My Bookings', icon: Calendar, gradient: 'from-pink-500 to-purple-500' },
  ];

  const accountItems = [
    { id: 'profile', label: 'My Profile', icon: User, gradient: 'from-blue-500 to-indigo-500' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-violet-500 to-purple-500' },
  ];

  const supportItems = [
    { id: 'contact', label: 'Contact Us', icon: Phone, gradient: 'from-green-500 to-emerald-500' },
    { id: 'help', label: 'Help', icon: HelpCircle, gradient: 'from-yellow-500 to-orange-500' },
  ];

  const MenuItem = ({ item }: { item: any }) => {
    const isActive = activeView === item.id;
    return (
      <button
        onClick={() => {
          onViewChange(item.id);
          setIsMobileOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">COSB</h2>
            <p className="text-xs text-gray-500">Smart CNG Booking</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm text-gray-800">{userName}</p>
              <p className="text-xs text-gray-600">Premium User</p>
            </div>
          </div>
          <button
            onClick={onLocationChange}
            className="flex items-center gap-2 text-xs text-purple-700 hover:text-purple-900 transition-colors"
          >
            <MapPin className="w-3 h-3" />
            <span>{currentLocation}</span>
          </button>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-6 overflow-y-auto">
        <div>
          <p className="text-xs text-gray-500 mb-2 px-4">NAVIGATION</p>
          <div className="space-y-1">
            {navigationItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 px-4">ACCOUNT</p>
          <div className="space-y-1">
            {accountItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 px-4">SUPPORT & HELP</p>
          <div className="space-y-1">
            {supportItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Separator className="mt-4" />

      {/* Logout */}
      <div className="p-4">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Toggle Button */}
      <button
        onClick={onToggle}
        className="hidden lg:block fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-110"
        style={{ left: isOpen ? '280px' : '16px', transition: 'left 0.3s ease' }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-gradient-to-br from-white via-purple-50 to-pink-50 border-r-4 border-purple-200 z-40 transform transition-all duration-300 shadow-xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
