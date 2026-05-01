import { Booking } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QRCodeDisplay } from './QRCodeDisplay';
import { CheckCircle, Calendar, Clock, MapPin, Download, Share2 } from 'lucide-react';

interface BookingConfirmationDialogProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
}

export function BookingConfirmationDialog({ 
  booking, 
  open, 
  onClose 
}: BookingConfirmationDialogProps) {
  if (!booking) return null;

  const handleDownload = () => {
    // Mock download functionality
    alert('QR Code downloaded! (Mock functionality)');
  };

  const handleShare = () => {
    // Mock share functionality
    alert('Booking details shared! (Mock functionality)');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your CNG slot has been successfully booked. Save your QR code for station check-in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <QRCodeDisplay data={booking.qrCode} size={200} />
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Token Number</span>
              <Badge className="text-lg px-3 py-1">{booking.tokenNumber}</Badge>
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm">{booking.stationName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(booking.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{booking.timeSlot}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 Please arrive 5 minutes before your slot time. Show this QR code at the station for quick check-in.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <Button className="w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
