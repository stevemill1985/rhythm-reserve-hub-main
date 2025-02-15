import { useState } from "react";
import { ContactInfo, BookingStep } from "@/types/booking";

export const useBookingState = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.CONTACT);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const resetBookingState = () => {
    setStep(BookingStep.CONTACT);
    setContactInfo(null);
    setIsBookingInProgress(false);
  };

  return {
    step,
    setStep,
    contactInfo,
    setContactInfo,
    isBookingInProgress,
    setIsBookingInProgress,
    resetBookingState,
  };
};