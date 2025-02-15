import { BookingStep } from "@/types/booking";
import { ContactStep } from "./steps/ContactStep";
import { SuccessStep } from "./steps/SuccessStep";
import { DateTimeSelector } from "./DateTimeSelector";
import { ServiceSelector } from "./ServiceSelector";
import { DurationSelector } from "./DurationSelector";
import { ServiceType } from "@/types/services";
import { ContactInfo } from "@/types/booking";

interface BookingStepsProps {
  step: BookingStep;
  selectedDate?: Date;
  selectedTime: string | null;
  selectedDuration: string;
  selectedService: ServiceType | null;
  isBookingInProgress: boolean;
  onContactSubmit: (data: ContactInfo) => void;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onDurationSelect: (duration: string) => void;
  onServiceSelect: (service: ServiceType) => void;
  onDateTimeSubmit: () => void;
  onDurationConfirm: () => Promise<void>;
  onBack: (step: BookingStep) => void;
}

export const BookingSteps = ({
  step,
  selectedDate,
  selectedTime,
  selectedDuration,
  selectedService,
  isBookingInProgress,
  onContactSubmit,
  onDateSelect,
  onTimeSelect,
  onDurationSelect,
  onServiceSelect,
  onDateTimeSubmit,
  onDurationConfirm,
  onBack,
}: BookingStepsProps) => {
  switch (step) {
    case BookingStep.DATETIME:
      return (
        <DateTimeSelector
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
          selectedDuration={selectedDuration}
          onDurationSelect={onDurationSelect}
          onSubmit={onDateTimeSubmit}
          onBack={() => onBack(BookingStep.CONTACT)}
        />
      );
    case BookingStep.SERVICE:
      return (
        <ServiceSelector
          selectedService={selectedService}
          onServiceSelect={onServiceSelect}
          onBack={() => onBack(BookingStep.DATETIME)}
        />
      );
    case BookingStep.DURATION:
      return (
        <DurationSelector
          date={selectedDate}
          selectedTime={selectedTime}
          duration={selectedDuration}
          onDurationChange={onDurationSelect}
          onBack={() => onBack(BookingStep.SERVICE)}
          onConfirm={onDurationConfirm}
          isBookingInProgress={isBookingInProgress}
          selectedService={selectedService}
        />
      );
    case BookingStep.SUCCESS:
      return <SuccessStep />;
    default:
      return <ContactStep onSubmit={onContactSubmit} />;
  }
};