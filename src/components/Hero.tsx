
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToWhoWeAre = () => {
    const whoWeAreSection = document.querySelector('#who-we-are');
    whoWeAreSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-studio-black text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-studio-black to-transparent opacity-90" />
        <img
          src="/studio-bg.jpg"
          alt="DJ Studio"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-gradient-rainbow text-white rounded-full animate-fade-in bg-clip-text text-transparent font-bold">
            Premium DJ / Music Production Studio Space
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
            Creative Minds <br />
            "Your Sound, <br />
            Your Space"
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Professional music production and recording studio equipped with top-tier DJ gear. Experience the difference.
          </p>
          <button
            onClick={scrollToWhoWeAre}
            className="bg-gradient-to-r from-studio-gold to-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-studio-gold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Find out More
          </button>
        </motion.div>
      </div>
    </section>
  );
};
