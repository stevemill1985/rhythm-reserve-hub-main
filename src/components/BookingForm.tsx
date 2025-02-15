import { Toaster } from "@/components/ui/toaster";
import { useBookingManager } from "@/hooks/useBookingManager";
import { useBookingAuth } from "@/hooks/useBookingAuth";
import { BookingStep } from "@/types/booking";
import { Card } from "@/components/ui/card";
import { BookingSteps } from "./booking/BookingSteps";
import { toast } from "sonner";

export const BookingForm = () => {
  const {
    step,
    setStep,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedDuration,
    setSelectedDuration,
    selectedService,
    isBookingInProgress,
    handleGoogleAuthSuccess,
    handleContactFormSubmit,
    handleDateTimeSubmit,
    handleServiceSelect,
  } = useBookingManager();

  const { accessToken, login } = useBookingAuth(handleGoogleAuthSuccess);

  const handleDurationSelect = async () => {
    if (isBookingInProgress) return;
    
    try {
      if (!accessToken) {
        // If no token, trigger login flow
        await login();
        return;
      }
      
      // If we have a token, proceed with booking
      await handleGoogleAuthSuccess(accessToken);
    } catch (error) {
      console.error('Failed to process booking:', error);
      toast.error("Failed to process your booking. Please try again.");
    }
  };

  return (
    <section id="booking" className="py-20 bg-studio-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-studio-gold text-sm font-medium uppercase tracking-wider">
            Reserve Your Session
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Book Your Time
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto bg-studio-grey p-8 rounded-xl">
          <BookingSteps
            step={step}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedDuration={selectedDuration}
            selectedService={selectedService}
            isBookingInProgress={isBookingInProgress}
            onContactSubmit={handleContactFormSubmit}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onDurationSelect={setSelectedDuration}
            onServiceSelect={handleServiceSelect}
            onDateTimeSubmit={handleDateTimeSubmit}
            onDurationConfirm={handleDurationSelect}
            onBack={setStep}
          />
        </Card>
      </div>
    </section>
  );
};