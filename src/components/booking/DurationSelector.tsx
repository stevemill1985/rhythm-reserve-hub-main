import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatTime } from "@/utils/dateUtils";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ServiceType, SERVICES } from "@/types/services";

interface DurationSelectorProps {
  date?: Date;
  selectedTime: string | null;
  duration: string;
  onDurationChange: (duration: string) => void;
  onBack: () => void;
  onConfirm: () => Promise<void>;
  isBookingInProgress: boolean;
  selectedService: ServiceType | null;
}

const getDurationOptions = (selectedService: ServiceType | null) => {
  const basePrice = SERVICES.find(s => s.type === selectedService)?.price || 25;
  
  return [
    { value: "1", label: "1 hour", price: `€${basePrice}` },
    { value: "1.5", label: "1.5 hours", price: `€${basePrice * 1.5}` },
    { value: "2", label: "2 hours", price: `€${basePrice * 2}` }
  ];
};

export const DurationSelector = ({
  date,
  selectedTime,
  duration,
  onDurationChange,
  onBack,
  onConfirm,
  isBookingInProgress,
  selectedService
}: DurationSelectorProps) => {
  const startTime = selectedTime ? formatTime(selectedTime) : "";
  const durationOptions = getDurationOptions(selectedService);
  
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error during confirmation:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Select Duration</h3>
        <p className="text-gray-300">
          Selected service: {selectedService}
          <br />
          Selected date: {date?.toLocaleDateString()}
          <br />
          Start time: {startTime}
        </p>
      </div>

      <RadioGroup
        value={duration}
        onValueChange={onDurationChange}
        className="grid gap-4"
      >
        {durationOptions.map((option) => (
          <Label
            key={option.value}
            htmlFor={`duration-${option.value}`}
            className="cursor-pointer"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="relative flex items-center space-x-4 p-6 bg-[#1A1A1A] hover:bg-studio-black/40 transition-all duration-300 
                         border-2 border-studio-gold/20 hover:border-studio-gold/60 rounded-2xl shadow-lg hover:shadow-xl 
                         hover:shadow-studio-gold/20 group"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`duration-${option.value}`}
                  className="absolute left-4 text-studio-gold border-studio-gold data-[state=checked]:bg-studio-gold/20 
                           data-[state=checked]:border-studio-gold"
                />
                <div className="flex-1 pl-8">
                  <span className="text-lg font-medium text-gray-100 group-hover:text-studio-gold transition-colors">
                    {option.label}
                  </span>
                </div>
                <div className="text-studio-gold font-bold text-xl">
                  {option.price}
                </div>
              </Card>
            </motion.div>
          </Label>
        ))}
      </RadioGroup>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isBookingInProgress}
          className="text-black bg-white hover:bg-gray-100 hover:text-black border-studio-gold/20"
        >
          Back
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isBookingInProgress}
          className="bg-studio-gold hover:bg-studio-gold/90 text-black"
        >
          {isBookingInProgress ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};