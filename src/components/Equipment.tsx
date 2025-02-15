import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Equipment = () => {
  return (
    <section className="py-16 bg-studio-black text-white" id="equipment">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Equipment</h2>
          <p className="text-xl text-gray-300">State-of-the-art gear for your creative journey</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-studio-grey border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-studio-gold">DJ Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-lg text-gray-100">
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    2x Pioneer CDJ-3000s
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    2x Technics SL-1210MK7 Turntables
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Denon X1850 Professional Mixer
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-studio-grey border-none">
              <CardHeader>
                <CardTitle className="text-2xl text-studio-gold">Production Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-lg text-gray-100">
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Logic Pro X DAW
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Focusrite Scarlett 18i20 3rd Gen Audio Interface
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Genelec 1030A Studio Monitors
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Korg MicroKorg Synthesizer
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Akai MPC Live II
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Roland SH-201 Synthesizer
                  </li>
                  <li className="flex items-center">
                    <span className="text-studio-gold mr-2">•</span>
                    Behringer RD-9 Drum Machine
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};