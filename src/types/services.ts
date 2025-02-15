export type ServiceType = 
  | "DJ Lesson"
  | "Music Production Lesson"
  | "Practice Space"
  | "5 Hours DJ Lesson Package"
  | "5 Hours Music Production Lesson Package"
  | "10 Hours DJ Lesson Package"
  | "10 Hours Music Production Lesson Package"
  | "15 Hours DJ Lesson Package"
  | "15 Hours Music Production Lesson Package";

export interface Service {
  type: ServiceType;
  price: number;
}

export const SERVICES: Service[] = [
  { type: "DJ Lesson", price: 25 },
  { type: "Music Production Lesson", price: 25 },
  { type: "Practice Space", price: 15 },
  { type: "5 Hours DJ Lesson Package", price: 115 },
  { type: "5 Hours Music Production Lesson Package", price: 115 },
  { type: "10 Hours DJ Lesson Package", price: 220 },
  { type: "10 Hours Music Production Lesson Package", price: 220 },
  { type: "15 Hours DJ Lesson Package", price: 315 },
  { type: "15 Hours Music Production Lesson Package", price: 315 }
];