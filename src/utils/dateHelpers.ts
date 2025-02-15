export const isDateDisabled = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today || date.getDay() === 0 || date.getDay() === 6;
};

export const isTimeSlotBooked = (
  timeStr: string,
  date: Date | undefined,
  bookedSlots: { start: Date; end: Date; }[]
) => {
  if (!date || !bookedSlots.length) return false;

  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = timeStr.includes('PM') ? 'PM' : 'AM';
  const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours;

  const slotTime = new Date(date);
  slotTime.setHours(hour24, minutes || 0, 0, 0);

  return bookedSlots.some(({ start, end }) => {
    const slotStart = slotTime.getTime();
    const slotEnd = new Date(slotTime.getTime() + 60 * 60 * 1000).getTime();
    const bookedStart = start.getTime();
    const bookedEnd = end.getTime();

    return (slotStart < bookedEnd && slotEnd > bookedStart);
  });
};