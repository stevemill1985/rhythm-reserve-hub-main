
import { Check } from "lucide-react";

const plans = [
  {
    name: "DJ / Music Production Lesson",
    price: "25",
    duration: "per hour",
    features: [
      "One-on-One Instruction",
      "Hands-on Practice",
      "Mixing Techniques",
      "Professional Equipment Access",
    ],
    gradient: "from-studio-purple to-studio-pink",
  },
  {
    name: "Practice Space",
    price: "15",
    duration: "per hour",
    features: [
      "Sound Treated Room",
      "Monitoring Speakers",
      "Audio and Video Recording Options",
      "Professional Equipment Access",
    ],
    gradient: "from-studio-blue to-studio-violet",
  },
];

const packages = [
  {
    name: "5 Hours DJ / Music Production Lesson Package",
    price: "115",
    savings: "Save €10",
    discount: "8%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 3 Months",
      "One-on-One Instruction",
      "All Equipment Included",
    ],
    gradient: "from-studio-gold to-studio-orange",
  },
  {
    name: "10 Hours DJ / Music Production Lesson Package",
    price: "220",
    savings: "Save €30",
    discount: "12%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 6 Months",
      "One-on-One Instruction",
      "All Equipment Included",
    ],
    gradient: "from-studio-green to-studio-blue",
  },
  {
    name: "15 Hours DJ / Music Production Lesson Package",
    price: "315",
    savings: "Save €60",
    discount: "16%",
    features: [
      "Flexible Booking Schedule",
      "Valid for 12 Months",
      "One-on-One Instruction",
      "All Equipment Included",
    ],
    gradient: "from-studio-pink to-studio-purple",
  },
];

export const Pricing = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-studio-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-studio-gold text-sm font-medium uppercase tracking-wider">
            Pricing Plans
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Choose Your Session Type
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-xl transform transition-all duration-300 hover:scale-105 
                         bg-gradient-to-br ${plan.gradient} shadow-xl`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-white">€{plan.price}</span>
                <span className="text-white/80 ml-2">{plan.duration}</span>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-white">
                    <Check className="w-5 h-5 text-studio-gold mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className="w-full mt-8 px-6 py-3 bg-white text-studio-black font-bold rounded-lg
                         transform transition-all duration-300 hover:scale-105 hover:bg-studio-gold"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <span className="text-studio-gold text-sm font-medium uppercase tracking-wider">
            Save More with
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Prepaid Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-xl transform transition-all duration-300 hover:scale-105 
                         bg-gradient-to-br ${pkg.gradient} shadow-xl`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-white">€{pkg.price}</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.savings}
                </span>
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.discount} off
                </span>
              </div>
              <ul className="space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center text-white">
                    <Check className="w-5 h-5 text-white mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToContact}
                className="w-full mt-8 px-6 py-3 bg-white text-studio-black font-bold rounded-lg
                         transform transition-all duration-300 hover:scale-105 hover:bg-studio-gold"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
