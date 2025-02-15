import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstructorInfo } from "@/types/booking";
import { motion } from "framer-motion";

const instructors: InstructorInfo[] = [
  {
    id: "Kiki",
    name: "Kiki",
    role: "Lead Producer",
    image: "/lovable-uploads/df029c2e-bd22-4e3d-9e07-58029c28b8c5.png"
  },
  {
    id: "Steve",
    name: "Steve Mill",
    role: "Studio Owner",
    image: "/lovable-uploads/89c650cf-8363-4bb1-b553-3d405104d163.png"
  }
];

interface InstructorSelectorProps {
  onInstructorSelect: (instructor: InstructorInfo) => void;
  onBack: () => void;
}

export const InstructorSelector = ({ onInstructorSelect, onBack }: InstructorSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-6">Choose Your Instructor</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map((instructor) => (
          <motion.div
            key={instructor.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="p-6 cursor-pointer hover:bg-studio-grey/80 transition-colors"
              onClick={() => onInstructorSelect(instructor)}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold">{instructor.name}</h4>
                  <p className="text-sm text-gray-400">{instructor.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};