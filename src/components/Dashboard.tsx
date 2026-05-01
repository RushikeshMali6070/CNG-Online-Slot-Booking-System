import { CNGStation, Booking } from '../types';
import { CheckCircle2, Zap, Calendar as CalendarIcon, TrendingUp, Fuel, Users, Clock, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface DashboardProps {
  stations: CNGStation[];
  bookings: Booking[];
  onNavigate: (view: string) => void;
}

export function Dashboard({ stations, bookings, onNavigate }: DashboardProps) {
  const availableStations = stations.filter(s => s.availableSlots > 0).length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalAvailableSlots = stations.reduce((acc, s) => acc + s.availableSlots, 0);
  
  // Mock data for currently filling
  const currentlyFilling = 18;
  const stationCapacity = 6; // 6 vehicles at one time

  const statCards = [
    {
      title: 'Available Slots',
      value: `${availableStations}`,
      subtitle: 'of 6 total',
      icon: CheckCircle2,
      gradient: 'from-cyan-400 to-teal-500',
      iconBg: 'bg-teal-500'
    },
    {
      title: 'Currently Filling',
      value: `${currentlyFilling}`,
      subtitle: 'Active sessions',
      icon: Zap,
      gradient: 'from-orange-400 to-amber-500',
      iconBg: 'bg-orange-500'
    },
    {
      title: 'Booked Slots',
      value: `${confirmedBookings}`,
      subtitle: 'Upcoming',
      icon: CalendarIcon,
      gradient: 'from-pink-400 to-purple-500',
      iconBg: 'bg-pink-500'
    },
    {
      title: 'Utilization Rate',
      value: '67%',
      subtitle: 'Station efficiency',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-indigo-600',
      iconBg: 'bg-blue-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-rose-500 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <h2 className="mb-4">Welcome Back! 👋</h2>
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
              <span className="text-sm">🎯 Active Bookings: {confirmedBookings}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
              <span className="text-sm">⛽ Stations: {stations.length}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
              <span className="text-sm">✨ Available Slots: {totalAvailableSlots}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-4xl mb-1">{stat.value}</h3>
                  <p className="text-white/70 text-xs">{stat.subtitle}</p>
                </div>
                <div className={`${stat.iconBg} bg-white/20 backdrop-blur-sm p-3 rounded-xl`}>
                  <stat.icon className="w-7 h-7" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full" />
          </Card>
        ))}
      </div>

      {/* CNG Filling Slots Status */}
      <Card className="p-6 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 border-2 border-purple-300 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Fuel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800">CNG Filling Slots - Shivajinagar CNG Point</h3>
              <p className="text-sm text-gray-600">Real-time slot status</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              CNG Available
            </Badge>
          </div>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6].map((slot) => {
            const isFillingSlot1 = slot === 1;
            const isFillingSlot4 = slot === 4;
            const isAvailable = slot === 2 || slot === 3;
            const isFilling = isFillingSlot1 || isFillingSlot4;
            const progress = isFilling ? (slot === 1 ? 74 : 45) : 0;

            return (
              <div
                key={slot}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFilling
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-400 animate-pulse-slow'
                    : isAvailable
                    ? 'bg-gradient-to-br from-green-100 to-teal-100 border-teal-400'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`text-2xl mb-1 ${isFilling ? 'text-yellow-600' : isAvailable ? 'text-teal-600' : 'text-gray-400'}`}>
                    {isFilling ? '⚡' : isAvailable ? '✅' : '🔒'}
                  </div>
                  <p className={`text-sm mb-2 ${isFilling ? 'text-yellow-800' : isAvailable ? 'text-teal-800' : 'text-gray-600'}`}>
                    Slot {slot}
                  </p>
                  {isFilling && (
                    <>
                      <Badge className={`text-xs mb-2 ${slot === 1 ? 'bg-yellow-500' : 'bg-orange-500'} text-white border-0`}>
                        Filling
                      </Badge>
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className={slot === 1 ? 'text-yellow-700' : 'text-orange-700'}>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        {slot === 1 && (
                          <p className="text-xs text-gray-600 mt-1">36 min left</p>
                        )}
                      </div>
                    </>
                  )}
                  {isAvailable && (
                    <Badge className="bg-teal-500 text-white text-xs border-0">
                      Available
                    </Badge>
                  )}
                  {!isFilling && !isAvailable && (
                    <Badge className="bg-gray-400 text-white text-xs border-0">
                      Booked
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
              <span className="text-gray-600">Filling</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <span className="text-gray-600">Booked</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4" />
            <span>{currentlyFilling} vehicles in queue</span>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 border-2 border-cyan-300 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 mb-2">Book Time Slot</h3>
              <p className="text-sm text-gray-600 mb-4">
                Reserve your slot at any CNG station across Pune
              </p>
              <Button
                onClick={() => onNavigate('timeslot')}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg"
              >
                Book Now
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 border-2 border-pink-300 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 mb-2">My Bookings</h3>
              <p className="text-sm text-gray-600 mb-4">
                View and manage your upcoming CNG bookings
              </p>
              <Button
                onClick={() => onNavigate('mybookings')}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg"
              >
                View Bookings
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Bookings Preview */}
      {confirmedBookings > 0 && (
        <Card className="p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Upcoming Bookings</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('mybookings')}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {bookings
              .filter(b => b.status === 'confirmed')
              .slice(0, 3)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <Fuel className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{booking.stationName}</p>
                      <p className="text-xs text-gray-600">
                        {booking.date} at {booking.timeSlot}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">
                    Confirmed
                  </Badge>
                </div>
              ))}
          </div>
        </Card>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
