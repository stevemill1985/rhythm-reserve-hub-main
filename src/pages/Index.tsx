
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Equipment } from "@/components/Equipment";
import { WhoAreWe } from "@/components/WhoAreWe";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { Instagram } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/8ea72fd2-318c-4bd4-be75-cb5f82837d6b.png')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
      <div className="relative z-10">
        <Hero />
        <WhoAreWe />
        <WhatWeOffer />
        <Equipment />
        <Pricing />
        <Features />
        <div id="contact" className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-studio-gold mb-6">Get in Touch</h2>
            <p className="text-white text-xl mb-8">Want to learn more about our services?</p>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://www.instagram.com/creativemindsskg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Instagram className="w-6 h-6" />
                DM on Instagram
              </a>
            </div>
            <p className="text-gray-300 mt-6">
              Follow us for the latest updates and announcements!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
