import { toast } from "sonner";
import { ContactInfo } from "@/types/booking";
import { ServiceType } from "@/types/services";

interface EmailConfirmationProps {
  date: Date;
  time: string;
  duration: string;
  contactInfo: ContactInfo;
  selectedService?: ServiceType;
}

export const sendConfirmationEmail = async ({
  date,
  time,
  duration,
  contactInfo,
  selectedService,
}: EmailConfirmationProps) => {
  console.log("Sending confirmation email with details:", {
    date,
    time,
    duration,
    contactInfo,
    selectedService,
  });

  const subject = `Booking Confirmation - Creative Minds Studio`;
  const studioInfo = `
Studio Contact: +306981137214
Studio Location: https://maps.app.goo.gl/Fbe7Sz3HAR66RBWH7`;

  const message = `
Dear ${contactInfo.fullName},

Thank you for booking with Creative Minds Studio! Your session has been confirmed.

Booking Details:
- Date: ${date.toLocaleDateString()}
- Time: ${time}
- Duration: ${duration} hour(s)
- Service: ${selectedService || 'Studio Session'}

${studioInfo}

If you need to make any changes to your booking, please contact us directly.

Best regards,
Creative Minds Studio Team`;

  try {
    // Create the email draft using Gmail API
    const email = btoa(
      `To: ${contactInfo.email}\r\n` +
      `Cc: stratosmilonas@gmail.com\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n\r\n` +
      `${message}`
    ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('googleAccessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    toast.success("Booking confirmation sent to your email!");
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    toast.error("We couldn't send the confirmation email, but your booking is confirmed.");
  }
};