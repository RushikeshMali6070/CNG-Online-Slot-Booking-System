export interface CNGStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  availableSlots: number;
  totalSlots: number;
  price: number;
  rating: number;
  operatingHours: string;
  amenities: string[];
}

export interface TimeSlot {
  id?: string;
  time: string;
  available: boolean;
  capacity: number;
  booked?: number;
  waiting?: number;
}

export interface Booking {
  id: string;
  stationId: string;
  stationName: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  qrCode: string;
  tokenNumber: string;
}
