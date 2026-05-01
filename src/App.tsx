import { useState } from 'react';
import { CNGStation, TimeSlot, Booking } from './types';
import { mockStations, mockBookings } from './lib/mock-data';
import { AuthPage } from './components/AuthPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TimeSlotView } from './components/TimeSlotView';
import { MyBookings } from './components/MyBookings';
import { MyProfile } from './components/MyProfile';
import { ContactUs } from './components/ContactUs';
import { Settings } from './components/Settings';
import { BookingConfirmationDialog } from './components/BookingConfirmationDialog';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { MapPin, RefreshCw } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [stations] = useState<CNGStation[]>(mockStations);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [newBooking, setNewBooking] = useState<Booking | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [currentLocation, setCurrentLocation] = useState('Shivaji Nagar, Pune');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [locationSearch, setLocationSearch] = useState('');

  const puneLocations = [
    'Shivaji Nagar, Pune',
    'Karve Nagar, Pune',
    'Swargate, Pune',
    'Hinjewadi, Pune',
    'Katraj, Pune',
    'Kothrud, Pune',
    'Wakad, Pune',
    'Baner, Pune',
    'Aundh, Pune',
    'Kharadi, Pune',
    'Viman Nagar, Pune',
    'Hadapsar, Pune',
    'Pimpri, Pune',
    'Chinchwad, Pune',
    'Nigdi, Pune'
  ];

  const filteredLocations = puneLocations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleLogin = (email: string, name: string) => {
    // Set Tejas Mane as default user
    setUser({ email, name: 'Tejas Mane' });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setBookings(mockBookings);
    setActiveView('dashboard');
    toast.success('Logged out successfully');
  };

  const handleLocationChange = () => {
    setShowLocationDialog(true);
  };

  const selectLocation = (location: string) => {
    setCurrentLocation(location);
    setShowLocationDialog(false);
    toast.success(`Location changed to ${location}`);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const handleConfirmBooking = (station: CNGStation, date: Date, timeSlot: TimeSlot) => {
    const booking: Booking = {
      id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
      stationId: station.id,
      stationName: station.name,
      date: date.toISOString().split('T')[0],
      timeSlot: timeSlot.time,
      status: 'confirmed',
      qrCode: `QR-BK${String(bookings.length + 1).padStart(3, '0')}-${station.id}-${timeSlot.time.replace(':', '')}`,
      tokenNumber: `T-${String(bookings.length + 1).padStart(3, '0')}`
    };

    setBookings([booking, ...bookings]);
    setNewBooking(booking);
    setShowConfirmation(true);
    
    toast.success('Booking confirmed!', {
      description: `Your slot at ${station.name} is booked for ${timeSlot.time}`
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ));
    toast.success('Booking cancelled successfully');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stations={stations} bookings={bookings} onNavigate={setActiveView} />;
      case 'timeslot':
        return <TimeSlotView stations={stations} onBookingConfirm={handleConfirmBooking} />;
      case 'mybookings':
        return <MyBookings bookings={bookings} onCancelBooking={handleCancelBooking} />;
      case 'profile':
        return <MyProfile userName={user?.name || 'Tejas Mane'} userEmail={user?.email || ''} />;
      case 'settings':
        return <Settings />;
      case 'contact':
        return <ContactUs />;
      case 'help':
        return (
          <Card className="p-8">
            <h3 className="text-gray-800 mb-4">Help & Support</h3>
            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="text-gray-800 mb-2">How to book a slot?</h4>
                <p className="text-sm">1. Go to Time Slots section<br/>2. Select a station and date<br/>3. Choose your preferred time<br/>4. Complete payment</p>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">How to cancel a booking?</h4>
                <p className="text-sm">Go to My Bookings and click cancel on your active booking.</p>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Need more help?</h4>
                <p className="text-sm">Contact our support team from the Contact Us page.</p>
              </div>
            </div>
          </Card>
        );
      default:
        return <Dashboard stations={stations} bookings={bookings} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen relative flex overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-200 via-pink-200 via-cyan-200 to-orange-200 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-teal-300/40 via-transparent to-purple-400/40 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.15),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.15),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(34,211,238,0.15),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_90%_70%,rgba(251,146,60,0.15),transparent_50%)] -z-10" />
      
      {/* Decorative Floating Elements */}
      <div className="fixed top-10 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="fixed top-40 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      <div className="fixed bottom-32 right-1/3 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
      <div className="fixed top-1/2 right-10 w-56 h-56 bg-teal-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
      
      <Toaster />
      
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={handleLogout}
        userName={user?.name || 'Tejas Mane'}
        currentLocation={currentLocation}
        onLocationChange={handleLocationChange}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${!isSidebarOpen ? 'ml-0' : ''}`}>
        <Header userName={user?.name || 'Tejas Mane'} isSidebarOpen={isSidebarOpen} />
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {renderView()}
        </div>
      </main>

      {/* Location Change Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={(open) => {
        setShowLocationDialog(open);
        if (!open) setLocationSearch('');
      }}>
        <DialogContent className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800">
              <MapPin className="w-5 h-5 text-purple-600" />
              Search & Select Location
            </DialogTitle>
            <DialogDescription>
              Search and select your preferred location in Pune to find nearby CNG stations
            </DialogDescription>
          </DialogHeader>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
            <Input
              placeholder="Search for a location in Pune..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="pl-11 h-12 border-2 border-purple-300 focus:border-purple-500 bg-white"
            />
          </div>

          {/* Location List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    selectLocation(location);
                    setLocationSearch('');
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    currentLocation === location
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg scale-105'
                      : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-md text-gray-800 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${currentLocation === location ? 'text-white' : 'text-purple-600'}`} />
                    <span>{location}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No locations found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Dialog */}
      <BookingConfirmationDialog
        booking={newBooking}
        open={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setNewBooking(null);
        }}
      />
    </div>
  );
}
