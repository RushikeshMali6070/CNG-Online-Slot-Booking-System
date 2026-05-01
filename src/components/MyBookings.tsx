import { useState } from 'react';
import { Booking } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, QrCode, X } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export function MyBookings({ bookings, onCancelBooking }: MyBookingsProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="space-y-6">
      {activeBookings.length > 0 && (
        <div>
          <div className="mb-4 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 p-4 rounded-2xl border-2 border-green-300">
            <h3 className="text-gray-800">Active Bookings</h3>
            <p className="text-sm text-gray-600">Your upcoming CNG refueling slots</p>
          </div>
          <div className="space-y-3">
            {activeBookings.map((booking) => (
              <Card key={booking.id} className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{booking.stationName}</h4>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{booking.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {booking.tokenNumber}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    View QR
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this booking?')) {
                          onCancelBooking(booking.id);
                        }
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {pastBookings.length > 0 && (
        <div>
          <div className="mb-4 bg-gradient-to-r from-gray-100 via-slate-100 to-zinc-100 p-4 rounded-2xl border-2 border-gray-300">
            <h3 className="text-gray-800">Past Bookings</h3>
            <p className="text-sm text-gray-600">Your booking history</p>
          </div>
          <div className="space-y-3">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 opacity-75">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{booking.stationName}</h4>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline">
                    {booking.tokenNumber}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-3xl border-2 border-purple-300">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="mb-2 text-gray-800">No bookings yet</h3>
          <p className="text-gray-600">
            Book your first CNG slot to get started
          </p>
        </div>
      )}

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-sm bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
          <DialogHeader>
            <DialogTitle>Booking QR Code</DialogTitle>
            <DialogDescription>Show this QR code at the CNG station for check-in</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <QRCodeDisplay data={selectedBooking.qrCode} size={250} />
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-sm mb-1">Token Number</p>
                <Badge className="text-lg px-3 py-1">{selectedBooking.tokenNumber}</Badge>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Show this QR code at the station for check-in
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
