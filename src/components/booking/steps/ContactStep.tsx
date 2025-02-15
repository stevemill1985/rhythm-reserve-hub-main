import { ContactForm } from "../../ContactForm";
import { ContactInfo } from "@/types/booking";

interface ContactStepProps {
  onSubmit: (data: ContactInfo) => void;
}

export const ContactStep = ({ onSubmit }: ContactStepProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
      <ContactForm onSubmit={onSubmit} />
    </div>
  );
};