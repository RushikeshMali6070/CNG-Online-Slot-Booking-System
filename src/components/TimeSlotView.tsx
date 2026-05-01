import { useState } from 'react';
import { CNGStation, TimeSlot, Booking } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Star, Clock, Fuel, ChevronLeft, ChevronRight, Zap, CreditCard, Wallet, Building2, Smartphone, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TimeSlotViewProps {
  stations: CNGStation[];
  onBookingConfirm: (station: CNGStation, date: Date, timeSlot: TimeSlot) => void;
}

export function TimeSlotView({ stations, onBookingConfirm }: TimeSlotViewProps) {
  const [selectedStation, setSelectedStation] = useState<CNGStation | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'datetime' | 'payment' | 'paymentdetails' | 'confirm'>('datetime');
  
  // Payment form states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardOTP, setCardOTP] = useState('');
  const [walletType, setWalletType] = useState('');
  const [upiId, setUpiId] = useState('');
  const [walletOTP, setWalletOTP] = useState('');
  const [showBookingConfirmed, setShowBookingConfirmed] = useState(false);

  const timeSlots: TimeSlot[] = [
    { time: '06:00', available: true, capacity: 6, waiting: 0 },
    { time: '07:00', available: true, capacity: 6, waiting: 2 },
    { time: '08:00', available: true, capacity: 6, waiting: 5 },
    { time: '09:00', available: true, capacity: 6, waiting: 3 },
    { time: '10:00', available: true, capacity: 6, waiting: 1 },
    { time: '11:00', available: true, capacity: 6, waiting: 0 },
    { time: '12:00', available: false, capacity: 6, waiting: 8 },
    { time: '13:00', available: true, capacity: 6, waiting: 2 },
    { time: '14:00', available: true, capacity: 6, waiting: 0 },
    { time: '15:00', available: true, capacity: 6, waiting: 4 },
    { time: '16:00', available: false, capacity: 6, waiting: 6 },
    { time: '17:00', available: true, capacity: 6, waiting: 7 },
    { time: '18:00', available: true, capacity: 6, waiting: 9 },
    { time: '19:00', available: false, capacity: 6, waiting: 10 },
    { time: '20:00', available: true, capacity: 6, waiting: 3 },
    { time: '21:00', available: true, capacity: 6, waiting: 1 },
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, gradient: 'from-purple-500 to-pink-500' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, gradient: 'from-orange-500 to-amber-500' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, gradient: 'from-green-500 to-emerald-500' },
  ];

  const handleStationSelect = (station: CNGStation) => {
    setSelectedStation(station);
    setShowBookingDialog(true);
    setCurrentStep('datetime');
    setSelectedTime(null);
    setSelectedPayment('');
  };

  const handlePrevStation = () => {
    if (currentStationIndex > 0) {
      setCurrentStationIndex(currentStationIndex - 1);
    }
  };

  const handleNextStation = () => {
    if (currentStationIndex < stations.length - 1) {
      setCurrentStationIndex(currentStationIndex + 1);
    }
  };

  const handleNextFromDateTime = () => {
    if (!selectedTime) {
      toast.error('Please select a time slot');
      return;
    }
    setCurrentStep('payment');
  };

  const handleNextFromPayment = () => {
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    setCurrentStep('paymentdetails');
  };

  const handleNextFromPaymentDetails = () => {
    // Validate payment details
    if (selectedPayment === 'card') {
      if (!cardName || !cardNumber || !cardExpiry || !cardCVV || !cardOTP) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (selectedPayment === 'wallet') {
      if (!walletType || !upiId || !walletOTP) {
        toast.error('Please fill all wallet details');
        return;
      }
    }
    setCurrentStep('confirm');
  };

  const handleBooking = () => {
    if (!selectedStation || !selectedTime || !selectedPayment) {
      toast.error('Please select a time slot and payment method');
      return;
    }

    onBookingConfirm(selectedStation, selectedDate, selectedTime);
    setShowBookingConfirmed(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowBookingConfirmed(false);
      setShowBookingDialog(false);
      resetBookingForm();
    }, 3000);
  };

  const resetBookingForm = () => {
    setSelectedTime(null);
    setSelectedPayment('');
    setCurrentStep('datetime');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
    setCardOTP('');
    setWalletType('');
    setUpiId('');
    setWalletOTP('');
  };

  const handleCancelPayment = () => {
    setShowBookingDialog(false);
    resetBookingForm();
    toast.info('Payment cancelled');
  };

  const currentStation = stations[currentStationIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-800 mb-1">Find CNG Stations</h2>
          <p className="text-gray-600">Select a station and book your time slot</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevStation}
            disabled={currentStationIndex === 0}
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
            <span className="text-sm text-gray-700">
              {currentStationIndex + 1} / {stations.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextStation}
            disabled={currentStationIndex === stations.length - 1}
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Featured Station */}
      <Card className="p-6 bg-gradient-to-br from-purple-100 via-pink-100 via-orange-100 to-amber-100 border-2 border-purple-300 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-800 mb-2">{currentStation.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">{currentStation.address}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-700">{currentStation.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{currentStation.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Fuel className="w-4 h-4 text-orange-600" />
                    <span>₹{currentStation.price}/kg</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStation.amenities.map((amenity, index) => (
                    <Badge
                      key={amenity}
                      className={`text-xs ${
                        index % 4 === 0 ? 'bg-purple-100 text-purple-700 border-purple-300' :
                        index % 4 === 1 ? 'bg-pink-100 text-pink-700 border-pink-300' :
                        index % 4 === 2 ? 'bg-cyan-100 text-cyan-700 border-cyan-300' :
                        'bg-orange-100 text-orange-700 border-orange-300'
                      } border`}
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1">
                  <Zap className="w-3 h-3 mr-1" />
                  CNG Available
                </Badge>
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 px-3 py-1">
                  {currentStation.availableSlots}/{currentStation.totalSlots} Slots
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/50 rounded-full h-3 shadow-inner border border-purple-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-sm"
                  style={{ width: `${(currentStation.availableSlots / currentStation.totalSlots) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-700">
                {Math.round((currentStation.availableSlots / currentStation.totalSlots) * 100)}%
              </span>
            </div>
          </div>

          <div className="flex md:flex-col gap-2">
            <Button
              onClick={() => handleStationSelect(currentStation)}
              className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={currentStation.availableSlots === 0}
            >
              <Zap className="w-4 h-4 mr-2" />
              Book Slot
            </Button>
          </div>
        </div>
      </Card>

      {/* All Stations Grid */}
      <div>
        <h3 className="text-gray-800 mb-4">All CNG Stations</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((station) => (
            <Card
              key={station.id}
              className="p-5 hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 cursor-pointer hover:scale-105 bg-white"
              onClick={() => handleStationSelect(station)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-gray-800 mb-1">{station.name}</h4>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{station.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>⭐ {station.rating}</span>
                    <span>📍 {station.distance} km</span>
                  </div>
                </div>
                <Badge className={`${station.availableSlots > 2 ? 'bg-green-500' : 'bg-orange-500'} text-white border-0`}>
                  {station.availableSlots}/{station.totalSlots}
                </Badge>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm"
                size="sm"
                disabled={station.availableSlots === 0}
              >
                {station.availableSlots > 0 ? 'Book Now' : 'Full'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Book Your CNG Slot
            </DialogTitle>
            <DialogDescription>
              Select your preferred date, time slot, and payment method to complete your booking
            </DialogDescription>
          </DialogHeader>

          {selectedStation && (
            <div className="w-full">
              {/* Progress Steps */}
              <div className="grid grid-cols-4 mb-6 bg-white rounded-lg shadow-md p-1 text-sm">
                <div className={`p-3 rounded-lg text-center transition-all ${currentStep === 'datetime' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-600'}`}>
                  1. Date & Time
                </div>
                <div className={`p-3 rounded-lg text-center transition-all ${currentStep === 'payment' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-600'}`}>
                  2. Payment
                </div>
                <div className={`p-3 rounded-lg text-center transition-all ${currentStep === 'paymentdetails' ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white' : 'text-gray-600'}`}>
                  3. Details
                </div>
                <div className={`p-3 rounded-lg text-center transition-all ${currentStep === 'confirm' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'text-gray-600'}`}>
                  4. Confirm
                </div>
              </div>

              {/* Date & Time Step */}
              {currentStep === 'datetime' && (
                <div className="space-y-4">
                  <Card className="p-6 bg-white border-2 border-purple-200">
                    <h4 className="text-gray-800 mb-4">Select Date</h4>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        disabled={(date) => date < new Date()}
                        className="rounded-xl border-2 border-purple-200 shadow-lg"
                      />
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border-2 border-purple-200">
                    <h4 className="text-gray-800 mb-4">Select Time Slot (6 vehicles per slot)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot)}
                          disabled={!slot.available}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedTime?.time === slot.time
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg scale-105'
                              : slot.available
                              ? 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-md'
                              : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Clock className="w-5 h-5 mb-2" />
                            <span className="text-sm mb-1">{slot.time}</span>
                            {slot.waiting > 0 && (
                              <Badge className={`text-xs ${selectedTime?.time === slot.time ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'} border-0`}>
                                {slot.waiting} waiting
                              </Badge>
                            )}
                            {!slot.available && (
                              <Badge className="text-xs bg-red-500 text-white border-0">
                                Full
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNextFromDateTime}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="space-y-4">
                  <Card className="p-6 bg-white border-2 border-blue-200">
                    <h4 className="text-gray-800 mb-4">Select Payment Method</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                            selectedPayment === method.id
                              ? `bg-gradient-to-r ${method.gradient} text-white border-transparent shadow-lg scale-105`
                              : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <method.icon className="w-8 h-8" />
                            <span className="text-lg">{method.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
                    <h4 className="text-gray-800 mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Station:</span>
                        <span className="text-gray-800">{selectedStation.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-gray-800">{selectedDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="text-gray-800">{selectedTime?.time || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Fee:</span>
                        <span className="text-gray-800">₹50</span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      onClick={() => setCurrentStep('datetime')}
                      variant="outline"
                      className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextFromPayment}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Details Step */}
              {currentStep === 'paymentdetails' && (
                <div className="space-y-4">
                  {/* Credit/Debit Card Form */}
                  {selectedPayment === 'card' && (
                    <Card className="p-6 bg-white border-2 border-teal-200">
                      <h4 className="text-gray-800 mb-4">Enter Card Details</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="Enter name on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              maxLength={5}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCVV">CVV</Label>
                            <Input
                              id="cardCVV"
                              placeholder="123"
                              type="password"
                              value={cardCVV}
                              onChange={(e) => setCardCVV(e.target.value)}
                              maxLength={3}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardOTP">OTP</Label>
                          <Input
                            id="cardOTP"
                            placeholder="Enter OTP sent to your phone"
                            value={cardOTP}
                            onChange={(e) => setCardOTP(e.target.value)}
                            maxLength={6}
                            className="mt-1"
                          />
                          <p className="text-xs text-gray-500 mt-1">OTP sent to your registered mobile number</p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Digital Wallet Form */}
                  {selectedPayment === 'wallet' && (
                    <Card className="p-6 bg-white border-2 border-teal-200">
                      <h4 className="text-gray-800 mb-4">Enter Wallet Details</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="walletType">Select Wallet</Label>
                          <Select value={walletType} onValueChange={setWalletType}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose your wallet" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paytm">Paytm</SelectItem>
                              <SelectItem value="googlepay">Google Pay</SelectItem>
                              <SelectItem value="phonepe">PhonePe</SelectItem>
                              <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                              <SelectItem value="mobikwik">Mobikwik</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="upiId">Mobile Number / UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="Enter mobile number or UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="walletOTP">OTP Confirmation</Label>
                          <Input
                            id="walletOTP"
                            placeholder="Enter OTP from wallet app"
                            value={walletOTP}
                            onChange={(e) => setWalletOTP(e.target.value)}
                            maxLength={6}
                            className="mt-1"
                          />
                          <p className="text-xs text-gray-500 mt-1">Check your wallet app for OTP</p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* UPI Form */}
                  {selectedPayment === 'upi' && (
                    <Card className="p-6 bg-white border-2 border-teal-200">
                      <h4 className="text-gray-800 mb-4">Enter UPI Details</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="upiIdDirect">UPI ID</Label>
                          <Input
                            id="upiIdDirect"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="upiOTP">UPI PIN / OTP</Label>
                          <Input
                            id="upiOTP"
                            placeholder="Enter UPI PIN or OTP"
                            type="password"
                            value={walletOTP}
                            onChange={(e) => setWalletOTP(e.target.value)}
                            maxLength={6}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Net Banking Form */}
                  {selectedPayment === 'netbanking' && (
                    <Card className="p-6 bg-white border-2 border-teal-200">
                      <h4 className="text-gray-800 mb-4">Net Banking</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bankName">Select Bank</Label>
                          <Select value={walletType} onValueChange={setWalletType}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sbi">State Bank of India</SelectItem>
                              <SelectItem value="hdfc">HDFC Bank</SelectItem>
                              <SelectItem value="icici">ICICI Bank</SelectItem>
                              <SelectItem value="axis">Axis Bank</SelectItem>
                              <SelectItem value="pnb">Punjab National Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-gray-700">
                            You will be redirected to your bank's secure login page to complete the payment.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  <div className="flex justify-between gap-2">
                    <Button
                      onClick={() => setCurrentStep('payment')}
                      variant="outline"
                      className="border-2 border-teal-300 text-teal-600 hover:bg-teal-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCancelPayment}
                        variant="outline"
                        className="border-2 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel Payment
                      </Button>
                      <Button
                        onClick={handleNextFromPaymentDetails}
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Step */}
              {currentStep === 'confirm' && (
                <div className="space-y-4">
                  <Card className="p-6 bg-white border-2 border-orange-200">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-gray-800">Ready to Book!</h3>
                      <p className="text-gray-600">
                        You are about to book a slot at {selectedStation.name}
                      </p>
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border-2 border-orange-200">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Time:</strong> {selectedTime?.time}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Payment Method:</strong> {paymentMethods.find(p => p.id === selectedPayment)?.name}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-between gap-2">
                    <Button
                      onClick={() => setCurrentStep('paymentdetails')}
                      variant="outline"
                      className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCancelPayment}
                        variant="outline"
                        className="border-2 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel Payment
                      </Button>
                      <Button
                        onClick={handleBooking}
                        disabled={!selectedTime || !selectedPayment}
                        className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl px-8"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Confirm Booking & Pay ₹50
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Confirmed Message */}
              {showBookingConfirmed && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <Card className="p-8 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 border-4 border-green-400 shadow-2xl max-w-md mx-4 animate-in zoom-in duration-300">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-14 h-14 text-white animate-pulse" />
                      </div>
                      <h2 className="text-gray-800">Booking Confirmed!</h2>
                      <p className="text-gray-700">
                        Your CNG slot has been successfully booked.
                      </p>
                      <div className="bg-white/80 p-4 rounded-xl border-2 border-green-300">
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Station:</strong> {selectedStation?.name}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Time:</strong> {selectedTime?.time}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm px-4 py-2 border-0">
                          Payment Successful - ₹50
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
