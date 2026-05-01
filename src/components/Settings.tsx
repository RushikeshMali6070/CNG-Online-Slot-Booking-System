import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Lock, Bell, Eye, Shield, Key, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Privacy settings
  const [showProfile, setShowProfile] = useState(true);
  const [showBookingHistory, setShowBookingHistory] = useState(true);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [allowEmailUpdates, setAllowEmailUpdates] = useState(false);
  const [shareData, setShareData] = useState(false);

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Simulate password update
    toast.success('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePrivacyUpdate = () => {
    toast.success('Privacy settings updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
        <h2 className="text-gray-800 mb-1">Settings</h2>
        <p className="text-gray-600">Manage your account and privacy settings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Password Settings */}
        <Card className="p-6 bg-white border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800">Update Password</h3>
              <p className="text-sm text-gray-600">Change your account password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="text-gray-700 mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-600" />
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="h-12 border-2"
              />
            </div>

            <div>
              <Label htmlFor="new-password" className="text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" />
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 border-2"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" />
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-12 border-2"
              />
            </div>

            <Button
              onClick={handlePasswordUpdate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6 bg-white border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-800">Privacy Settings</h3>
              <p className="text-sm text-gray-600">Control your privacy preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-800">Show Profile</p>
                  <p className="text-xs text-gray-600">Make profile visible to others</p>
                </div>
              </div>
              <Switch
                checked={showProfile}
                onCheckedChange={setShowProfile}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-800">Show Booking History</p>
                  <p className="text-xs text-gray-600">Display your booking history</p>
                </div>
              </div>
              <Switch
                checked={showBookingHistory}
                onCheckedChange={setShowBookingHistory}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-800">Push Notifications</p>
                  <p className="text-xs text-gray-600">Receive booking reminders</p>
                </div>
              </div>
              <Switch
                checked={allowNotifications}
                onCheckedChange={setAllowNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-800">Email Updates</p>
                  <p className="text-xs text-gray-600">Receive promotional emails</p>
                </div>
              </div>
              <Switch
                checked={allowEmailUpdates}
                onCheckedChange={setAllowEmailUpdates}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-800">Share Data</p>
                  <p className="text-xs text-gray-600">Share analytics data</p>
                </div>
              </div>
              <Switch
                checked={shareData}
                onCheckedChange={setShareData}
              />
            </div>

            <Button
              onClick={handlePrivacyUpdate}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Privacy Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Additional Settings */}
      <Card className="p-6 bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 border-2 border-cyan-300">
        <h4 className="text-gray-800 mb-4">Account Information</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/70 p-4 rounded-xl">
            <p className="text-gray-600 mb-1">Account Status</p>
            <p className="text-gray-800">Active</p>
          </div>
          <div className="bg-white/70 p-4 rounded-xl">
            <p className="text-gray-600 mb-1">Member Since</p>
            <p className="text-gray-800">January 2025</p>
          </div>
          <div className="bg-white/70 p-4 rounded-xl">
            <p className="text-gray-600 mb-1">Account Type</p>
            <p className="text-gray-800">Premium</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
