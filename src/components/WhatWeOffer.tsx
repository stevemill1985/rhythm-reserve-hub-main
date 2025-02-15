import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music, Building2, GraduationCap } from "lucide-react";

export const WhatWeOffer = () => {
  const offerings = [
    {
      title: "DJing & Music Production Courses",
      description: "Master the art of DJing and music production with comprehensive lessons designed for all skill levels. Whether you're just starting out or looking to refine your craft, our courses provide the expertise and tools needed to succeed in the world of electronic music.",
      features: [
        "Hands-on DJ training: beatmatching, mixing, and live performance",
        "Music production essentials: DAWs, sound design, and track arrangement",
        "Access to professional-grade equipment in a creative studio environment"
      ],
      icon: Music,
    },
    {
      title: "Creative Studio Services",
      description: "Our studio is the ultimate space for artists to create, record, and collaborate. From recording sessions to podcast features, we offer professional support to bring your creative vision to life.",
      features: [
        "Professional recording and production services",
        "Video/audio podcast or DJ mix recording services",
        "Collaborative environment for musicians and producers"
      ],
      icon: Building2,
    },
    {
      title: "Professional Guidance & Career Coaching",
      description: "Build a successful career in the electronic music industry with tailored guidance and coaching from Steve Mill. Gain insider knowledge, develop your brand, and take the next steps toward achieving your goals.",
      features: [
        "Personalized career development strategies",
        "Branding and artist identity creation",
        "Advice on label pitching, networking, and performance skills",
        "Support for navigating the music industry landscape"
      ],
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-studio-gold">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offerings.map((offering) => (
            <Card 
              key={offering.title} 
              className="bg-studio-grey/80 backdrop-blur-sm border-studio-gold/20 hover:border-studio-gold/40 transition-colors"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-studio-gold/10 w-fit">
                  <offering.icon className="w-8 h-8 text-studio-gold" />
                </div>
                <CardTitle className="text-xl text-studio-gold">{offering.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">
                  {offering.description}
                </CardDescription>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  {offering.features.map((feature, index) => (
                    <li key={index} className="leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};