import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, setHours, setMinutes, parse } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getBookedSlots } from "@/utils/googleCalendar";
import { TimeSlotGrid } from "./TimeSlotGrid";

// Add a global variable to track recently booked slots across component remounts
const recentlyBookedSlots: { start: Date; end: Date; }[] = [];

export const addRecentlyBookedSlot = (start: Date, end: Date) => {
  recentlyBookedSlots.push({ start, end });
  console.log('Added new booked slot:', { start, end });
  console.log('Current recently booked slots:', recentlyBookedSlots);
};

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  selectedDuration: string;
  onDurationSelect: (duration: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const DateTimeSelector = ({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  selectedDuration,
  onDurationSelect,
  onSubmit,
  onBack,
}: DateTimeSelectorProps) => {
  const [blink, setBlink] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ start: Date; end: Date; }[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    setBlink(true);
    const timer = setTimeout(() => setBlink(false), 500);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      
      setIsLoadingSlots(true);
      try {
        const accessToken = localStorage.getItem('googleAccessToken');
        if (!accessToken) {
          console.error('No access token available');
          return;
        }
        
        const slots = await getBookedSlots(accessToken, selectedDate);
        // Combine Google Calendar slots with recently booked slots
        const allBookedSlots = [...slots, ...recentlyBookedSlots].map(slot => ({
          start: new Date(slot.start),
          end: new Date(slot.end)
        }));
        console.log('All booked slots:', allBookedSlots);
        setBookedSlots(allBookedSlots);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const generateTimeSlots = () => {
    const slots = [];
    let currentHour = 9; // Start at 9 AM
    let currentMinute = 0;

    while (currentHour < 21) { // Until 9 PM
      // Don't add slots after 20:00 if they would end after 21:00
      if (currentHour === 20 && currentMinute === 0) {
        slots.push(`${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
        break;
      }

      slots.push(`${currentHour}:${currentMinute.toString().padStart(2, '0')}`);
      
      currentMinute += 30;
      if (currentMinute === 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = setMinutes(setHours(new Date(), hours), minutes);
    return format(date, 'h:mm a');
  };

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate || !bookedSlots.length) return false;

    // Parse the time string (e.g., "12:00 PM") into hours and minutes
    const parsedTime = parse(time, 'h:mm a', new Date());
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();

    // Create a new date object for the slot
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes, 0, 0);

    const slotStart = slotTime.getTime();
    const durationMs = parseFloat(selectedDuration) * 60 * 60 * 1000;
    const slotEnd = slotStart + durationMs;

    console.log('Checking slot:', {
      time,
      slotStart: new Date(slotStart),
      slotEnd: new Date(slotEnd),
      bookedSlots: bookedSlots.map(slot => ({
        start: new Date(slot.start),
        end: new Date(slot.end)
      }))
    });

    return bookedSlots.some(({ start, end }) => {
      // Ensure we're working with Date objects
      const bookedStart = new Date(start).getTime();
      const bookedEnd = new Date(end).getTime();
      
      // Check if the slot overlaps with a booked period
      const isOverlapping = (slotStart < bookedEnd && slotEnd > bookedStart);
      
      if (isOverlapping) {
        console.log('Slot is booked:', {
          slotTime: new Date(slotStart),
          bookedStart: new Date(start),
          bookedEnd: new Date(end)
        });
      }
      
      return isOverlapping;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-studio-gold hover:text-white transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Select Date</h3>
          <Card className="bg-studio-black p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={(date) => 
                date < new Date() || 
                date > addDays(new Date(), 30)
              }
              className="text-white [&_.day-selected]:bg-studio-gold [&_.day-selected]:text-black [&_.day-selected]:hover:bg-studio-gold/90"
            />
          </Card>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate?.toString()}
            initial={{ opacity: 1 }}
            animate={{ opacity: blink ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Select Time</h3>
            <ScrollArea className="h-[300px] rounded-md border border-studio-purple p-4">
              <TimeSlotGrid
                isLoadingSlots={isLoadingSlots}
                timeSlots={timeSlots.map(time => ({
                  time,
                  formatted: formatTimeSlot(time)
                }))}
                selectedTime={selectedTime}
                onTimeSelect={onTimeSelect}
                isTimeSlotBooked={isTimeSlotBooked}
              />
            </ScrollArea>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={onSubmit}
          disabled={!selectedDate || !selectedTime}
          className="bg-studio-gold hover:bg-studio-gold/90 text-black"
        >
          Continue to Booking
        </Button>
      </div>
    </div>
  );
};