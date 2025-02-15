import { TimeSlot } from "@/types/booking";
import { motion } from "framer-motion";

interface TimeSlotGridProps {
  isLoadingSlots: boolean;
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  isTimeSlotBooked: (time: string) => boolean;
}

export const TimeSlotGrid = ({
  timeSlots,
  selectedTime,
  onTimeSelect,
  isTimeSlotBooked,
}: TimeSlotGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
      {timeSlots.map(({ time, formatted }: TimeSlot) => {
        const isBooked = isTimeSlotBooked(formatted);
        return (
          <motion.button
            key={time}
            onClick={() => !isBooked && onTimeSelect(formatted)}
            whileHover={{ scale: isBooked ? 1 : 1.02 }}
            whileTap={{ scale: isBooked ? 1 : 0.98 }}
            disabled={isBooked}
            className={`p-3 rounded-lg text-center transition-all duration-300
              ${isBooked 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : selectedTime === formatted
                  ? "bg-studio-gold text-studio-black"
                  : "bg-studio-black text-white hover:bg-studio-purple"
              }`}
          >
            {formatted}
            {isBooked && <span className="block text-xs mt-1">(Booked)</span>}
          </motion.button>
        );
      })}
    </div>
  );
};