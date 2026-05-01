import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';
import { useState } from 'react';

interface MyProfileProps {
  userName: string;
  userEmail: string;
}

export function MyProfile({ userName, userEmail }: MyProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Pune, Maharashtra');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
        <div>
          <h2 className="text-gray-800 mb-1">My Profile</h2>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`${
            isEditing
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          } hover:shadow-lg`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-100 via-fuchsia-100 to-pink-100 border-2 border-purple-300 shadow-xl">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-gray-800 mb-1">{userName}</h3>
            <p className="text-sm text-gray-600">{userEmail}</p>
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="text-xs text-gray-500">Member since</p>
              <p className="text-sm text-gray-700">January 2025</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 p-6 bg-white border-2 border-gray-200">
          <h3 className="text-gray-800 mb-6">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="h-12 border-2"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={userEmail}
                  disabled
                  className="h-12 border-2 bg-gray-50"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="h-12 border-2"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isEditing}
                  className="h-12 border-2"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 border-2 border-cyan-300 text-center shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">🎯</div>
          <h4 className="text-gray-800 mb-1">Total Bookings</h4>
          <p className="text-2xl text-cyan-600">24</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 border-2 border-green-300 text-center shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">✅</div>
          <h4 className="text-gray-800 mb-1">Completed</h4>
          <p className="text-2xl text-green-600">22</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 border-2 border-orange-300 text-center shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl mb-2">⭐</div>
          <h4 className="text-gray-800 mb-1">Points Earned</h4>
          <p className="text-2xl text-orange-600">450</p>
        </Card>
      </div>
    </div>
  );
}
