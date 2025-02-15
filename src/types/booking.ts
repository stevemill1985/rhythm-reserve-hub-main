export enum BookingStep {
  CONTACT = "CONTACT",
  DATETIME = "DATETIME",
  SERVICE = "SERVICE",
  DURATION = "DURATION",
  SUCCESS = "SUCCESS"
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface InstructorInfo {
  id: Instructor;
  name: string;
  role: string;
  image: string;
}

export type Instructor = "Kiki" | "Steve";

export interface TimeSlot {
  time: string;
  formatted: string;
}