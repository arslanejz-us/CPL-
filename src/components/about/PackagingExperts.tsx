import Image from "next/image";
import iconPremium from "../../../public/about-us/icon-premium.png";
import iconPrecision from "../../../public/about-us/icon-precision.png";
import iconDurable from "../../../public/about-us/icon-durable.png";
import iconEco from "../../../public/about-us/icon-eco.png";

const EXPERTS = [
  {
    title: "Premium Materials",
    description:
      "Sourcing only the finest, most luxurious, highest-grade materials guarantees that every box we craft offers sturdiness. Each material is selected with care.",
    icon: iconPremium,
    bg: "bg-[#f0f0f0]",
  },
  {
    title: "Precision Design",
    description:
      "We are practicing leading-edge printing & design technology while exacting standards and using sustainable inks. Every curve & angle oozes perfection.",
    icon: iconPrecision,
    bg: "bg-[#e8f5f3]",
  },
  {
    title: "Durable Solutions",
    description:
      "Understanding that longevity is essential, we go the extra mile with rigorously testing and implementing QA measures to make our packaging solution.",
    icon: iconDurable,
    bg: "bg-[#f0f0f0]",
  },
  {
    title: "Eco-Friendly Packaging",
    description:
      "We use sustainable inks, biodegradable materials, and eco-conscious printing techniques that mirror our commitment to preserving the environment.",
    icon: iconEco,
    bg: "bg-[#e8f5f3]",
  },
];

export default function PackagingExperts() {
  return (
    <section className="py-8 sm:py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium font-montserrat text-brand-secondary text-center mb-8 sm:mb-12">
          Meet your Custom Packaging Experts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EXPERTS.map((expert) => (
            <div
              key={expert.title}
              className={`${expert.bg} rounded-lg p-4 sm:p-6 sm:pt-8 min-h-[280px] sm:min-h-[320px] flex flex-col`}
            >
              <Image
                src={expert.icon}
                alt=""
                className="w-12 sm:w-16 h-12 sm:h-16 object-contain mb-4 sm:mb-6"
              />
              <h3 className="text-lg font-medium font-montserrat text-brand-secondary mb-3">
                {expert.title}
              </h3>
              <p className="text-sm text-[#575757] opacity-65 leading-relaxed">
                {expert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
