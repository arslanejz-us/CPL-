const BRANDS = ["Google", "hp", "shopify", "L'ORÉAL", "PIQUE", "GREEN GIRL"];

export default function TrustedBrands() {
  // Duplicate so the marquee loops seamlessly
  const loop = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="relative flex-shrink-0 w-full bg-white py-5 overflow-hidden">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center gap-16 animate-marquee whitespace-nowrap">
        {loop.map((brand, i) => (
          <span
            key={i}
            className="font-display font-semibold text-xl sm:text-2xl tracking-wide text-gray-400"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
