
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const WhoAreWe = () => {
  const team = [
    {
      name: "Kiki Botonaki",
      role: "DJ / Producer / Studio Owner",
      description: "Kiki Botonaki is a DJ and music producer based in Thessaloniki, known for her eclectic sound, dynamic performances, and deep connection with her audience. A key figure in Greece's electronic music scene, she has been a radio producer at FLY104 since 2016, curating cutting-edge electronic sounds.\n\nHer career highlights include performing at the legendary Cavo Paradiso in Mykonos and releasing the Afro House hit 'We Fly' (Seres Produções) alongside Manuel Kane and Christos Fourkis, which reached No. 3 on Beatport's global Afro House chart. As a resident DJ at Aigli Geni Hamam and Thermaikos Bar, Kiki continues to shape the local scene while making waves internationally.\n\nWith her latest release 'Monks' on Wired Label featured in their 12-year anniversary compilation, Kiki remains a driving force in the underground music community, pushing boundaries with her distinctive style and undeniable stage presence.",
      imagePath: "/lovable-uploads/df029c2e-bd22-4e3d-9e07-58029c28b8c5.png",
      imageAlt: "Studio Owner",
    },
    {
      name: "Steve Mill",
      role: "DJ / Producer / Studio Owner",
      description: "Steve Mill is a DJ, producer, and music industry professional with over 15 years of experience shaping the electronic music landscape. His work has been released on renowned labels such as Large Music, Dirt Crew, and True Romance, and he has played a key role in the industry as label manager at Kerri Chandler's Madhouse Records.\n\nBorn in Greece and moving between Berlin, London, and Thessaloniki, Steve's sound fuses elements of House, Techno, and Balearic rhythms into music that resonates on dance floors worldwide. His DJ sets are immersive experiences, built on a vast collection of records and a deep understanding of dance music's evolution.\n\nThrough Creative Minds Studio, Steve brings his experience full circle—mentoring, educating, and collaborating with the next generation of artists. His expertise in A&R, music curation, and artist development has made him a trusted figure in the industry, connecting artists with audiences and opportunities.",
      imagePath: "/lovable-uploads/89c650cf-8363-4bb1-b553-3d405104d163.png",
      imageAlt: "Studio Owner",
    },
  ];

  return (
    <section id="who-we-are" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-studio-gold">
          Who Are We
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <Card key={member.name} className="bg-studio-grey/80 backdrop-blur-sm border-studio-gold/20">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-studio-gold">
                  <AvatarImage 
                    src={member.imagePath} 
                    alt={member.imageAlt}
                    className={`object-cover grayscale ${member.name === "Steve Mill" ? "object-[center_30%]" : "object-[center_40%]"}`}
                  />
                  <AvatarFallback className="bg-studio-gold text-studio-black">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-studio-gold">{member.name}</CardTitle>
                  <CardDescription className="text-gray-300">{member.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-100 whitespace-pre-line">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
