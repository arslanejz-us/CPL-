const BENEFITS = [
  "Flexible Payment Terms – Net-15, Net-30, or custom plans",
  "Low MOQs – Start from as low as 100 boxes",
  "Fast Turnarounds – Orders delivered in 10-12 business days",
  "Dedicated Account Managers – You'll always have one point of contact",
];

export default function WhyChoose() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-[40px] font-medium font-montserrat text-brand-secondary leading-tight">
              Why Choose Custom
              <br />
              Packaging Lane
            </h2>
            <p className="text-base text-[#575757] mt-6 leading-relaxed">
              Because good packaging should be the easiest part of your
              business:
            </p>
          </div>

          <ul className="divide-y divide-gray-300">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="py-5 text-base font-medium font-montserrat text-brand-secondary"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
