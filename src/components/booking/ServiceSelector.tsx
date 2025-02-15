import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ServiceType, SERVICES } from "@/types/services";

interface ServiceSelectorProps {
  selectedService: ServiceType | null;
  onServiceSelect: (service: ServiceType) => void;
  onBack: () => void;
}

export const ServiceSelector = ({
  selectedService,
  onServiceSelect,
  onBack,
}: ServiceSelectorProps) => {
  const isPackage = (serviceType: string) => {
    return serviceType.includes('Package');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-studio-gold hover:text-white transition-colors"
        >
          ← Back to Contact Info
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-2">Select Service</h3>
        <p className="text-gray-300">Choose the service you'd like to book</p>
      </div>

      <RadioGroup
        value={selectedService || undefined}
        onValueChange={(value) => onServiceSelect(value as ServiceType)}
        className="grid gap-4"
      >
        {SERVICES.map((service) => (
          <Label
            key={service.type}
            htmlFor={`service-${service.type}`}
            className="cursor-pointer"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="relative flex items-center space-x-4 p-6 bg-[#1A1A1A] hover:bg-studio-black/40 transition-all duration-300 
                         border-2 border-studio-gold/20 hover:border-studio-gold/60 rounded-2xl shadow-lg hover:shadow-xl 
                         hover:shadow-studio-gold/20 group"
              >
                <RadioGroupItem
                  value={service.type}
                  id={`service-${service.type}`}
                  className="absolute left-4 text-studio-gold border-studio-gold data-[state=checked]:bg-studio-gold/20 
                           data-[state=checked]:border-studio-gold"
                />
                <div className="flex-1 pl-8">
                  <span className="text-lg font-medium text-gray-100 group-hover:text-studio-gold transition-colors">
                    {service.type}
                  </span>
                </div>
                <div className="text-studio-gold font-bold text-xl">
                  €{service.price}{!isPackage(service.type) && '/hour'}
                </div>
              </Card>
            </motion.div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};