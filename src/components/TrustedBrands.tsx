interface Brand {
  id?: string;
  brand_name?: string;
  brand_logo?: string;
}

const DEFAULT_BRANDS = [
  { brand_name: "Google" },
  { brand_name: "HP" },
  { brand_name: "Shopify" },
  { brand_name: "L'ORÉAL" },
  { brand_name: "PIQUE" },
  { brand_name: "GREEN GIRL" },
];

export default function TrustedBrands({ brands }: { brands?: Brand[] }) {
  // Use provided brands or fallback to default
  const brandsList = brands && brands.length > 0 ? brands : DEFAULT_BRANDS;

  // Duplicate so the marquee loops seamlessly
  const loop = [...brandsList, ...brandsList, ...brandsList];

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
            {brand.brand_name}
          </span>
        ))}
      </div>
    </section>
  );
}
