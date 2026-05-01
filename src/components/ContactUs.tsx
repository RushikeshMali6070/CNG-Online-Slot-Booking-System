import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactUs() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 p-6 rounded-2xl border-2 border-cyan-300 shadow-lg">
        <h2 className="text-gray-800 mb-1">Contact Us</h2>
        <p className="text-gray-600">Get in touch with our support team</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-100 via-fuchsia-100 to-pink-100 border-2 border-purple-300 text-center hover:scale-105 transition-transform shadow-xl">
          <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Phone className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-gray-800 mb-2">Phone</h4>
          <p className="text-sm text-gray-600">+91 20 1234 5678</p>
          <p className="text-sm text-gray-600">Mon-Sat, 9 AM - 6 PM</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 border-2 border-cyan-300 text-center hover:scale-105 transition-transform shadow-xl">
          <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-gray-800 mb-2">Email</h4>
          <p className="text-sm text-gray-600">support@cosb.com</p>
          <p className="text-sm text-gray-600">We reply within 24 hrs</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 border-2 border-orange-300 text-center hover:scale-105 transition-transform shadow-xl">
          <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-orange-600 to-amber-600 rounded-full flex items-center justify-center">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <h4 className="text-gray-800 mb-2">Address</h4>
          <p className="text-sm text-gray-600">FC Road, Shivaji Nagar</p>
          <p className="text-sm text-gray-600">Pune, Maharashtra 411004</p>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-white via-purple-50 to-pink-50 border-2 border-purple-300 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-800">Send us a message</h3>
            <p className="text-sm text-gray-600">Fill out the form below and we'll get back to you</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name" className="text-gray-700 mb-2">Name</Label>
              <Input
                id="contact-name"
                placeholder="Your name"
                className="h-12 border-2 border-gray-200 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-gray-700 mb-2">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your.email@example.com"
                className="h-12 border-2 border-gray-200 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact-subject" className="text-gray-700 mb-2">Subject</Label>
            <Input
              id="contact-subject"
              placeholder="How can we help you?"
              className="h-12 border-2 border-gray-200 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="contact-message" className="text-gray-700 mb-2">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell us more about your inquiry..."
              className="min-h-32 border-2 border-gray-200 focus:border-purple-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 shadow-lg hover:shadow-xl"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
}
