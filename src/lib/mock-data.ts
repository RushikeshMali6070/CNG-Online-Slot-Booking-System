import { CNGStation, TimeSlot, Booking } from '../types';

export const mockStations: CNGStation[] = [
  {
    id: '1',
    name: 'Shivaji Nagar Green CNG',
    address: 'FC Road, Shivaji Nagar, Pune',
    distance: 1.2,
    availableSlots: 8,
    totalSlots: 12,
    price: 82.50,
    rating: 4.5,
    operatingHours: '24/7',
    amenities: ['Restroom', 'Air Pump', 'Water']
  },
  {
    id: '2',
    name: 'Karve Nagar Quick Fill',
    address: 'Karve Road, Karve Nagar, Pune',
    distance: 2.3,
    availableSlots: 4,
    totalSlots: 10,
    price: 83.00,
    rating: 4.2,
    operatingHours: '6 AM - 11 PM',
    amenities: ['Restroom', 'Convenience Store', 'Air Pump']
  },
  {
    id: '3',
    name: 'Swargate EcoFuel Hub',
    address: 'Near Railway Station, Swargate, Pune',
    distance: 3.2,
    availableSlots: 10,
    totalSlots: 15,
    price: 82.00,
    rating: 4.7,
    operatingHours: '24/7',
    amenities: ['Restroom', 'Air Pump', 'Water', 'Café']
  },
  {
    id: '4',
    name: 'Hinjewadi IT Park CNG',
    address: 'Phase 1, Hinjewadi, Pune',
    distance: 8.5,
    availableSlots: 6,
    totalSlots: 18,
    price: 82.75,
    rating: 4.6,
    operatingHours: '24/7',
    amenities: ['Restroom', 'Air Pump', 'Water', 'ATM']
  },
  {
    id: '5',
    name: 'Katraj Metro CNG Station',
    address: 'Satara Road, Katraj, Pune',
    distance: 4.8,
    availableSlots: 12,
    totalSlots: 20,
    price: 83.50,
    rating: 4.8,
    operatingHours: '24/7',
    amenities: ['Restroom', 'Air Pump', 'Water', 'Café', 'ATM']
  },
  {
    id: '6',
    name: 'Karve Nagar Express CNG',
    address: 'Warje-Karve Nagar Road, Pune',
    distance: 2.8,
    availableSlots: 5,
    totalSlots: 12,
    price: 82.25,
    rating: 4.4,
    operatingHours: '6 AM - 10 PM',
    amenities: ['Air Pump', 'Water']
  }
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
                 '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', 
                 '20:00', '21:00', '22:00'];
  
  hours.forEach((time, index) => {
    const capacity = 10;
    const booked = Math.floor(Math.random() * 12);
    slots.push({
      id: `slot-${index}`,
      time,
      available: booked < capacity,
      capacity,
      booked
    });
  });
  
  return slots;
};

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    stationId: '1',
    stationName: 'Shivaji Nagar Green CNG',
    date: '2025-10-05',
    timeSlot: '09:00',
    status: 'confirmed',
    qrCode: 'QR-BK001-SNG-0900',
    tokenNumber: 'T-001'
  },
  {
    id: 'BK002',
    stationId: '3',
    stationName: 'Swargate EcoFuel Hub',
    date: '2025-10-04',
    timeSlot: '15:00',
    status: 'completed',
    qrCode: 'QR-BK002-SWG-1500',
    tokenNumber: 'T-045'
  }
];
