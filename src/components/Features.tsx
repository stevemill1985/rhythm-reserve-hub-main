import { motion } from "framer-motion";
import { Headphones, Music, Speaker, MapPin } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Pro Equipment",
    description: "Industry-standard mixers, controllers, synthesizers and drum machines",
  },
  {
    icon: Speaker,
    title: "Perfect Acoustics",
    description: "Professionally treated recording space",
  },
  {
    icon: Music,
    title: "Full Setup",
    description: "Complete DJ booth configuration",
  },
  {
    icon: MapPin,
    title: "Easy Access",
    description: "Convenient location with available parking",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-studio-grey">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-studio-gold text-sm font-medium uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Studio Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-studio-black rounded-xl text-center transform transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-studio-purple rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-studio-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};