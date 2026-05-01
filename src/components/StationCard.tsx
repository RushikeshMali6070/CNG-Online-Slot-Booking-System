import { CNGStation } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Clock, Fuel } from 'lucide-react';

interface StationCardProps {
  station: CNGStation;
  onBookSlot: (station: CNGStation) => void;
}

export function StationCard({ station, onBookSlot }: StationCardProps) {
  const availabilityPercentage = (station.availableSlots / station.totalSlots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return 'bg-gradient-to-r from-emerald-400 to-green-500';
    if (availabilityPercentage > 25) return 'bg-gradient-to-r from-yellow-400 to-orange-400';
    return 'bg-gradient-to-r from-red-400 to-pink-500';
  };

  const getAvailabilityBadge = () => {
    if (station.availableSlots > 5) return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0';
    if (station.availableSlots > 0) return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0';
    return 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0';
  };

  return (
    <Card className="p-5 hover:shadow-2xl transition-all duration-300 border-2 hover:border-cyan-200 hover:scale-105 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="mb-1 text-gray-800">{station.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 text-cyan-600" />
            <span className="text-sm">{station.address}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{station.rating}</span>
            <span className="text-sm ml-3 text-cyan-600">📍 {station.distance} km</span>
          </div>
        </div>
        <Badge className={getAvailabilityBadge()}>
          {station.availableSlots}/{station.totalSlots}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className={`h-full rounded-full ${getAvailabilityColor()} shadow-sm`}
            style={{ width: `${availabilityPercentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-700">{Math.round(availabilityPercentage)}%</span>
      </div>

      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-cyan-600" />
          <span className="text-sm">{station.operatingHours}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Fuel className="w-4 h-4 text-blue-600" />
          <span className="text-sm">₹{station.price}/kg</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {station.amenities.map((amenity, index) => (
          <Badge 
            key={amenity} 
            className={`text-xs ${
              index % 4 === 0 ? 'bg-purple-100 text-purple-700 border-purple-300' :
              index % 4 === 1 ? 'bg-pink-100 text-pink-700 border-pink-300' :
              index % 4 === 2 ? 'bg-cyan-100 text-cyan-700 border-cyan-300' :
              'bg-green-100 text-green-700 border-green-300'
            } border`}
          >
            {amenity}
          </Badge>
        ))}
      </div>

      <Button 
        className={`w-full h-11 ${
          station.availableSlots > 0 
            ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
            : ''
        } transform hover:scale-105 transition-all duration-200`}
        onClick={() => onBookSlot(station)}
        disabled={station.availableSlots === 0}
      >
        {station.availableSlots > 0 ? '⚡ Book Slot Now' : 'No Slots Available'}
      </Button>
    </Card>
  );
}
