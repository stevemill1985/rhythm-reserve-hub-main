import { toast } from "@/hooks/use-toast";
import { addEventToGoogleCalendar } from "@/utils/googleCalendar";
import { sendConfirmationEmail } from "@/components/booking/EmailConfirmation";
import { ContactInfo, BookingStep } from "@/types/booking";
import { ServiceType } from "@/types/services";

interface BookingActions {
  setStep: (step: BookingStep) => void;
  setIsBookingInProgress: (value: boolean) => void;
}

export const handleBookingSubmission = async (
  date: Date,
  selectedTime: string,
  duration: string,
  contactInfo: ContactInfo,
  selectedService: ServiceType | null,
  accessToken: string,
  actions: BookingActions
) => {
  const { setStep, setIsBookingInProgress } = actions;

  try {
    setIsBookingInProgress(true);
    
    await addEventToGoogleCalendar(
      accessToken,
      date,
      selectedTime,
      duration,
      contactInfo,
      selectedService
    );
    
    await sendConfirmationEmail({
      date,
      time: selectedTime,
      duration,
      contactInfo,
      selectedService,
    });
    
    setStep(BookingStep.SUCCESS);
  } catch (error) {
    console.error('Booking error:', error);
    toast({
      title: "Booking Error",
      description: "Failed to complete your booking. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsBookingInProgress(false);
  }
};