import { Boxes, Zap, Headset, BadgeDollarSign } from "lucide-react";

const FEATURES = [
  {
    title: "Flexible Order Volume",
    desc: "From low MOQs to high-volume production runs.",
    Icon: Boxes,
  },
  {
    title: "Fastest Turnaround",
    desc: "7–10 business day lead times with free shipping.",
    Icon: Zap,
  },
  {
    title: "24/7 Expert Support",
    desc: "Dedicated packaging specialists available anytime.",
    Icon: Headset,
  },
  {
    title: "Price Match Guarantee",
    desc: "Competitive pricing without compromising quality.",
    Icon: BadgeDollarSign,
  },
];

export default function Features() {
  return (
    <section className="w-full py-8 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {FEATURES.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-4 sm:p-4 lg:px-6 sm:border-b lg:border-b-0"
            >
              <span className="text-brand-primary flex-shrink-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display font-bold text-[12px] sm:text-[13px] uppercase tracking-wide text-brand-secondary">
                  {title}
                </h3>
                <p className="font-montserrat text-[10px] sm:text-[11px] text-gray-500 mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
