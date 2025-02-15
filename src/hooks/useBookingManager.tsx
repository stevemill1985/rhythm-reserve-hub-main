import { useState } from "react";
import { ContactInfo, BookingStep } from "@/types/booking";
import { ServiceType } from "@/types/services";
import { toast } from "sonner";
import { addEventToGoogleCalendar } from "@/utils/googleCalendar";
import { sendConfirmationEmail } from "@/components/booking/EmailConfirmation";
import { addRecentlyBookedSlot } from "@/components/booking/DateTimeSelector";

export const useBookingManager = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.CONTACT);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState("1");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const handleGoogleAuthSuccess = async (token: string) => {
    if (isBookingInProgress) return;
    
    if (!selectedDate || !selectedTime || !contactInfo || !selectedService) {
      toast.error("Please complete all booking information before proceeding");
      return;
    }

    setIsBookingInProgress(true);

    try {
      // Parse the selected time and create start/end dates
      const [hours, minutes] = selectedTime.match(/\d+/g)!;
      const period = selectedTime.includes('PM') ? 'PM' : 'AM';
      const hour24 = period === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours);
      
      const startDate = new Date(selectedDate);
      startDate.setHours(hour24, parseInt(minutes), 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setTime(startDate.getTime() + parseFloat(selectedDuration) * 60 * 60 * 1000);

      const calendarResult = await addEventToGoogleCalendar(
        token,
        selectedDate,
        selectedTime,
        selectedDuration,
        contactInfo,
        selectedService
      );

      if (!calendarResult) {
        throw new Error('Failed to create calendar event');
      }

      // Add the slot to recently booked slots immediately after successful booking
      addRecentlyBookedSlot(startDate, endDate);

      await sendConfirmationEmail({
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        contactInfo,
        selectedService,
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

  const handleContactFormSubmit = (data: ContactInfo) => {
    setContactInfo(data);
    setStep(BookingStep.DATETIME);
  };

  const handleDateTimeSubmit = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    setStep(BookingStep.SERVICE);
  };

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    if (service.includes('Hours')) {
      const hours = service.match(/\d+/)?.[0] || "1";
      setSelectedDuration(hours);
    }
    setStep(BookingStep.DURATION);
  };

  return {
    step,
    setStep,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedDuration,
    setSelectedDuration,
    selectedService,
    contactInfo,
    isBookingInProgress,
    handleGoogleAuthSuccess,
    handleContactFormSubmit,
    handleDateTimeSubmit,
    handleServiceSelect,
  };
};