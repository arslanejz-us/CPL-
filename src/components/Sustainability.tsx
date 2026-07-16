import Link from "next/link";
import { Recycle, TreePine, Droplet, Leaf } from "lucide-react";

const PILLARS = [
  {
    title: "100% Recyclable",
    desc: "Every box is made from recyclable materials to reduce waste.",
    Icon: Recycle,
  },
  {
    title: "FSC Certified",
    desc: "Responsibly sourced paperboard from managed forests.",
    Icon: TreePine,
  },
  {
    title: "Eco Inks",
    desc: "Soy and water-based inks instead of harmful solvents.",
    Icon: Droplet,
  },
  {
    title: "Carbon Offset",
    desc: "Carbon-neutral shipping on every order we deliver.",
    Icon: Leaf,
  },
];

export default function Sustainability() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="sustainability">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary tracking-tight leading-tight">
              Premium Packaging
              <br />
              the Planet Approves of.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-5 max-w-md">
              We&apos;ve engineered our supply chain to be eco-friendly, isn&apos;t a
              tradeoff. From paper to ink to logistics — every stage is auditable,
              certified and built to scale.
            </p>
            <Link
              href="#quote"
              className="inline-block mt-7 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-7 transition-colors"
              style={{ borderRadius: '10px' }}
            >
              Begin Your Journey
            </Link>
          </div>

          {/* Right cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderRadius: '10px' }}
              >
                <span className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-bold text-brand-secondary mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
