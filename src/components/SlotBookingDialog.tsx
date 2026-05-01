import { useState } from 'react';
import { CNGStation, TimeSlot } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Clock, Users } from 'lucide-react';
import { generateTimeSlots } from '../lib/mock-data';

interface SlotBookingDialogProps {
  station: CNGStation | null;
  open: boolean;
  onClose: () => void;
  onConfirmBooking: (station: CNGStation, date: Date, timeSlot: TimeSlot) => void;
}

export function SlotBookingDialog({ 
  station, 
  open, 
  onClose, 
  onConfirmBooking 
}: SlotBookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots(new Date()));

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setTimeSlots(generateTimeSlots(date));
      setSelectedSlot(null);
    }
  };

  const handleBooking = () => {
    if (station && selectedSlot) {
      onConfirmBooking(station, selectedDate, selectedSlot);
      onClose();
    }
  };

  if (!station) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Slot - {station.name}</DialogTitle>
          <DialogDescription>{station.address}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="mb-3">Select Date</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border"
            />
          </div>

          <div>
            <h4 className="mb-3">Select Time Slot</h4>
            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedSlot?.id === slot.id
                      ? 'border-primary bg-primary/10'
                      : slot.available
                      ? 'border-border hover:border-primary/50'
                      : 'border-border bg-muted opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{slot.time}</span>
                    </div>
                    {slot.available ? (
                      <Badge variant="outline" className="text-xs">Available</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Full</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{slot.booked}/{slot.capacity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleBooking}
            disabled={!selectedSlot}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
