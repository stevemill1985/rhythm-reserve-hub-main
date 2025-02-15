import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ContactInfo } from "@/types/booking";
import { useBookingAuth } from "@/hooks/useBookingAuth";

interface ContactFormProps {
  onSubmit: (data: ContactInfo) => void;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactInfo>({
    email: "",
    fullName: "",
    phone: "",
  });

  const { login, accessToken } = useBookingAuth(async (token) => {
    // On successful auth, proceed with form submission
    if (formData.email && formData.fullName && formData.phone) {
      onSubmit(formData);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.includes("@gmail.com")) {
      toast.error("Please enter a valid Gmail address");
      return;
    }

    if (!formData.fullName || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // If we don't have an access token, trigger the Google login
      if (!accessToken) {
        await login();
        return;
      }
      
      // If we already have an access token, proceed with form submission
      onSubmit(formData);
    } catch (error) {
      console.error('Auth error:', error);
      toast.error("Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-white">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="bg-studio-black text-white border-studio-purple"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Gmail Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.name@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-studio-black text-white border-studio-purple"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+30 123 456 7890"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-studio-black text-white border-studio-purple"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-8 py-4 bg-studio-gold text-studio-black font-bold rounded-lg
                 transform transition-all duration-300 hover:scale-105 hover:bg-white"
      >
        Continue to Booking
      </button>
    </form>
  );
};