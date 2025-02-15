import { ContactInfo } from "@/types/booking";
import { ServiceType } from "@/types/services";

const STUDIO_CALENDAR_ID = 'stratosmilonas@gmail.com';

export const addEventToGoogleCalendar = async (
  accessToken: string,
  date: Date,
  time: string,
  duration: string,
  contactInfo: ContactInfo,
  selectedService: ServiceType
) => {
  const [timeStr, period] = time.split(' ');
  const [hours, minutes] = timeStr.split(':').map(Number);
  const hour24 = period === 'PM' && hours !== 12 ? hours + 12 : hours;

  const startTime = new Date(date);
  startTime.setHours(hour24, minutes || 0, 0, 0);

  const endTime = new Date(startTime);
  const durationHours = parseFloat(duration);
  endTime.setHours(startTime.getHours() + Math.floor(durationHours));
  endTime.setMinutes(startTime.getMinutes() + (durationHours % 1) * 60);

  console.log('Creating calendar event with:', {
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    contactInfo,
    selectedService,
    calendarId: STUDIO_CALENDAR_ID
  });

  const studioInfo = `
Studio Contact: +306981137214
Studio Location: https://maps.app.goo.gl/Fbe7Sz3HAR66RBWH7`;

  const event = {
    'summary': `${selectedService} with ${contactInfo.fullName}`,
    'description': `Booking Details:
- Service: ${selectedService}
- Duration: ${duration} hour(s)
- Contact Name: ${contactInfo.fullName}
- Phone: ${contactInfo.phone}
- Email: ${contactInfo.email}

${studioInfo}`,
    'start': {
      'dateTime': startTime.toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'end': {
      'dateTime': endTime.toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'attendees': [
      {'email': contactInfo.email},
      {'email': STUDIO_CALENDAR_ID}
    ],
    'reminders': {
      'useDefault': true
    }
  };

  try {
    // Create event in studio's calendar first
    const studioCalendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(STUDIO_CALENDAR_ID)}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          // Make sure to set the organizer as the studio
          organizer: { email: STUDIO_CALENDAR_ID },
          // Include both the client and studio as attendees
          attendees: [
            {'email': contactInfo.email},
            {'email': STUDIO_CALENDAR_ID, 'organizer': true}
          ],
          // Send notifications to all attendees
          'guestsCanModify': false,
          'sendUpdates': 'all'
        })
      }
    );

    if (!studioCalendarResponse.ok) {
      const errorData = await studioCalendarResponse.json();
      console.error('Failed to create event in studio calendar:', errorData);
      throw new Error('Failed to create studio calendar event');
    }

    // Create event in user's calendar
    const userCalendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      }
    );

    if (!userCalendarResponse.ok) {
      const errorData = await userCalendarResponse.json();
      console.error('Calendar API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to create calendar event');
    }

    const result = await userCalendarResponse.json();
    console.log('Calendar events created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

export const getBookedSlots = async (accessToken: string, date: Date): Promise<{ start: Date; end: Date; }[]> => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log('Fetching events for date:', {
      date: date.toISOString(),
      startOfDay: startOfDay.toISOString(),
      endOfDay: endOfDay.toISOString(),
      calendarId: STUDIO_CALENDAR_ID
    });

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(STUDIO_CALENDAR_ID)}/events?timeMin=${startOfDay.toISOString()}&timeMax=${endOfDay.toISOString()}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Calendar API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to fetch booked slots');
    }

    const data = await response.json();
    console.log('Retrieved calendar events:', data.items);

    const bookedTimeSlots = (data.items || [])
      .filter((event: any) => {
        return event?.start?.dateTime && event?.end?.dateTime;
      })
      .map((event: any) => ({
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime)
      }));

    console.log('Final booked time slots:', bookedTimeSlots);
    return bookedTimeSlots;
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    throw error;
  }
};
