import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Fuel, Mail, Lock, User, Phone, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthPageProps {
  onLogin: (email: string, name: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      toast.success('Welcome back, Tejas!');
      onLogin(loginEmail, 'Tejas Mane');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupName && signupEmail && signupPhone && signupPassword) {
      toast.success('Account created successfully!');
      onLogin(signupEmail, 'Tejas Mane');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-3xl mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-float">
            <Fuel className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl text-white mb-2 flex items-center justify-center gap-2 drop-shadow-lg">
            <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">COSB</span>
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </h1>
          <p className="text-white/95 text-lg">CNG Online Slot Booking</p>
          <p className="text-cyan-100 text-sm mt-2">📍 Pune City</p>
        </div>

        <Card className="p-8 shadow-2xl backdrop-blur-xl bg-white/98 border-2 border-white/50 hover:shadow-cyan-500/20 transition-all duration-300">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-cyan-100 to-blue-100 p-1">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-700">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600 group-focus-within:text-cyan-700" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-600 group-focus-within:text-cyan-700" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="flex items-center justify-center gap-2">
                    Login to Continue
                    <Sparkles className="w-4 h-4" />
                  </span>
                </Button>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200">
                  <p className="text-center text-sm text-cyan-800">
                    💡 Demo Mode: Use any email and password
                  </p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-700">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-600 group-focus-within:text-pink-700" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-600 group-focus-within:text-pink-700" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone" className="text-gray-700">Phone Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-600 group-focus-within:text-pink-700" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700">Create Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-600 group-focus-within:text-pink-700" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-11 h-12 border-2 border-gray-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <Sparkles className="w-4 h-4" />
                  </span>
                </Button>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200">
                  <p className="text-center text-xs text-pink-800">
                    By signing up, you agree to our Terms & Conditions
                  </p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-white/90 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full inline-block border border-white/20">
            🚗 Book your CNG slot in advance and skip the queue!
          </p>
          <div className="flex items-center justify-center gap-4 text-white/80 text-xs">
            <span>⚡ Instant Booking</span>
            <span>•</span>
            <span>📱 QR Code</span>
            <span>•</span>
            <span>🎯 No Waiting</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
