import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const SuccessStep = () => {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col items-center justify-center py-12 space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500" />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-white mt-4 text-center"
      >
        Booking Confirmed!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-300 text-center max-w-md"
      >
        Thank you for booking with Creative Minds Studio. 
        A confirmation email has been sent to your inbox.
      </motion.p>
    </motion.div>
  );
};