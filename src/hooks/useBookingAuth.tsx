
import { useState, useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from "sonner";

export const useBookingAuth = (onAuthSuccess: (token: string) => void) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('googleAccessToken');
    return storedToken;
  });

  useEffect(() => {
    // Check if token exists and is valid
    const checkToken = async () => {
      const token = localStorage.getItem('googleAccessToken');
      if (token) {
        try {
          const response = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token);
          if (!response.ok) {
            localStorage.removeItem('googleAccessToken');
            setAccessToken(null);
          }
        } catch (error) {
          localStorage.removeItem('googleAccessToken');
          setAccessToken(null);
        }
      }
    };

    checkToken();
  }, []);

  const login = useGoogleLogin({
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.events.owned',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.settings.basic',
      'https://www.googleapis.com/auth/gmail.settings.sharing',
      'https://mail.google.com/'
    ].join(' '),
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      setAccessToken(token);
      localStorage.setItem('googleAccessToken', token);
      
      try {
        await onAuthSuccess(token);
      } catch (error) {
        console.error('Error during auth success callback:', error);
        toast.error("Failed to complete the booking process. Please try again.");
      }
    },
    onError: (error) => {
      console.error('Google OAuth Error:', error);
      toast.error("Failed to authenticate with Google Calendar. Please try again.");
    },
  });

  return { accessToken, login };
};
