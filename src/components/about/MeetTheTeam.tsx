import Image from "next/image";
import teamMeharunisa from "../../../public/about-us/team-meharunisa.jpg";
import teamSalman from "../../../public/about-us/team-salman.jpg";
import teamHamzah from "../../../public/about-us/team-hamzah.jpg";

const TEAM = [
  { name: "Irum Saeed", role: "Co Founder", image: teamMeharunisa },  { name: "Meharunisa", role: "Co Founder", image: teamMeharunisa },
  { name: "Salman Ghaznavi", role: "Group CEO", image: teamSalman },
  { name: "Hamzah Bhatti", role: "Director", image: teamHamzah },
];

export default function MeetTheTeam() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-[40px] font-medium font-montserrat text-brand-secondary text-center mb-4">
          Meet the Team
        </h2>
        <p className="text-base text-[#575757] text-center max-w-3xl mx-auto leading-relaxed mb-12">
          Our team is a blend of creative thinkers, strategic minds, and skilled
          professionals who work hard together to deliver exceptional results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="relative rounded-lg overflow-hidden bg-[#4a4a4a] aspect-[3/4]"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top grayscale"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-5">
                <p className="text-white font-bold text-lg leading-tight">
                  {member.name}
                </p>
                <p className="text-white/80 text-sm mt-0.5">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
