import { useState } from "react";
import { ContactInfo, BookingStep } from "@/types/booking";
import { ServiceType } from "@/types/services";
import { toast } from "sonner";
import { addEventToGoogleCalendar } from "@/utils/googleCalendar";
import { sendConfirmationEmail } from "@/components/booking/EmailConfirmation";

export const useBookingActions = (setStep: (step: BookingStep) => void) => {
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const handleBooking = async (
    date: Date | undefined,
    selectedTime: string | null,
    duration: string,
    contactInfo: ContactInfo | null,
    selectedService: ServiceType | null
  ) => {
    if (!date || !selectedTime || !contactInfo || !selectedService) {
      const missingFields = [];
      if (!date) missingFields.push('Date');
      if (!selectedTime) missingFields.push('Time');
      if (!contactInfo) missingFields.push('Contact Information');
      if (!selectedService) missingFields.push('Service');
      
      toast.error(`Please fill in all required information: ${missingFields.join(', ')}`);
      return;
    }

    setIsBookingInProgress(true);

    try {
      const accessToken = localStorage.getItem('googleAccessToken');
      if (!accessToken) {
        throw new Error('Not authenticated with Google Calendar');
      }

      console.log('Starting booking process with:', {
        date,
        selectedTime,
        duration,
        contactInfo,
        selectedService
      });

      const calendarResult = await addEventToGoogleCalendar(
        accessToken,
        date,
        selectedTime,
        duration,
        contactInfo,
        selectedService
      );

      if (!calendarResult) {
        throw new Error('Failed to create calendar event');
      }

      console.log('Calendar event created successfully:', calendarResult);

      await sendConfirmationEmail({
        date,
        time: selectedTime,
        duration,
        contactInfo,
        selectedService,
      });

      console.log('Confirmation email sent successfully');

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
    isBookingInProgress,
    handleBooking,
  };
};