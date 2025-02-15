import { useState } from "react";
import { BookingStep } from "@/types/booking";

export const useBookingSteps = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.CONTACT);

  const handleBack = () => {
    if (step === BookingStep.SUCCESS) {
      setStep(BookingStep.CONTACT);
    }
  };

  return {
    step,
    setStep,
    handleBack,
  };
};