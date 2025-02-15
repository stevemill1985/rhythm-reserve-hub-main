import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PackageSelectorProps {
  onPackageSelect: (packageName: string) => void;
  onBack: () => void;
}

const packages = [
  {
    name: "DJ Lesson",
    price: "25",
    features: [
      "One-on-One Instruction",
      "Professional Equipment Access",
      "Hands-on Practice",
      "Mixing Techniques"
    ],
    gradient: "from-studio-gold to-studio-orange",
  },
  {
    name: "Music Production Lesson",
    price: "25",
    features: [
      "One-on-One Instruction",
      "Professional Equipment Access",
      "Sound Design Training",
      "DAW Mastery"
    ],
    gradient: "from-studio-green to-studio-blue",
  },
  {
    name: "Practice Space",
    price: "15",
    features: [
      "Sound Treated Room",
      "Monitoring Speakers",
      "Audio Recording Options",
      "Professional Equipment Access"
    ],
    gradient: "from-studio-pink to-studio-purple",
  },
  {
    name: "5 Hours DJ/Music Production Course",
    price: "115",
    savings: "Save €10",
    discount: "8%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 3 Months",
      "One-on-One Instruction",
      "All Equipment Included"
    ],
    gradient: "from-studio-gold to-studio-orange",
  },
  {
    name: "10 Hours DJ/Music Production Course",
    price: "220",
    savings: "Save €30",
    discount: "12%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 6 Months",
      "One-on-One Instruction",
      "All Equipment Included"
    ],
    gradient: "from-studio-green to-studio-blue",
  },
  {
    name: "15 Hours DJ/Music Production Course",
    price: "315",
    savings: "Save €60",
    discount: "16%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 12 Months",
      "One-on-One Instruction",
      "All Equipment Included"
    ],
    gradient: "from-studio-pink to-studio-purple",
  },
];

export const PackageSelector = ({ onPackageSelect, onBack }: PackageSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-studio-gold hover:text-white transition-colors"
        >
          ← Back
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Select Service</h3>
        <p className="text-gray-300 mb-6">Choose your preferred service</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer bg-gradient-to-br ${pkg.gradient} transform transition-all duration-300`}
              onClick={() => onPackageSelect(pkg.name)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                <span className="text-white font-bold">
                  €{pkg.price}{!pkg.savings && '/hour'}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};