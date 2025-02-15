export const formatTime = (time: string) => {
  return time.replace(/[APM]/g, '').trim();
};

export const formatTimeForDisplay = (time: string) => {
  return time.replace(/[APM]/g, '').trim();
};

export const createEventDateTime = (date: Date, timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = timeStr.includes('PM') ? 'PM' : 'AM';
  const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours;

  const eventTime = new Date(date);
  eventTime.setHours(hour24, minutes || 0, 0, 0);
  return eventTime;
};

export const isTimeSlotBooked = (
  timeStr: string,
  date: Date | undefined,
  bookedSlots: { start: Date; end: Date; }[]
) => {
  if (!date || !bookedSlots.length) return false;

  const slotTime = createEventDateTime(date, timeStr);
  const slotStart = slotTime.getTime();
  const slotEnd = new Date(slotTime.getTime() + 60 * 60 * 1000).getTime();

  return bookedSlots.some(({ start, end }) => {
    const bookedStart = start.getTime();
    const bookedEnd = end.getTime();
    return (slotStart < bookedEnd && slotEnd > bookedStart);
  });
};