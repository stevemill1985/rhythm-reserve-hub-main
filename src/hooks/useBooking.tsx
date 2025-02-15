import { useBookingState } from "./useBookingState";
import { ContactInfo, BookingStep } from "@/types/booking";
import { ServiceType } from "@/types/services";
import { toast } from "sonner";
import { addEventToGoogleCalendar } from "@/utils/googleCalendar";
import { sendConfirmationEmail } from "@/components/booking/EmailConfirmation";

export const useBooking = () => {
  const {
    step,
    setStep,
    contactInfo,
    setContactInfo,
    isBookingInProgress,
    setIsBookingInProgress,
  } = useBookingState();

  const handleContactSubmit = (data: ContactInfo) => {
    setContactInfo(data);
    setStep(BookingStep.SUCCESS);
  };

  const handleBooking = async () => {
    if (!contactInfo) {
      toast.error("Please fill in all required information");
      return;
    }

    setIsBookingInProgress(true);

    try {
      const accessToken = localStorage.getItem('googleAccessToken');
      if (!accessToken) {
        throw new Error('Not authenticated with Google Calendar');
      }

      console.log('Starting booking process with:', {
        contactInfo
      });

      setStep(BookingStep.SUCCESS);
      toast.success("Booking confirmed! Check your email for details.");
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || "Failed to complete your booking. Please try again.");
    } finally {
      setIsBookingInProgress(false);
    }
  };

  return {
    step,
    setStep,
    contactInfo,
    isBookingInProgress,
    handleContactSubmit,
    handleBooking,
  };
};