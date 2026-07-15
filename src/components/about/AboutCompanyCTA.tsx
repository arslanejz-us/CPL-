import Link from "next/link";

export default function AboutCompanyCTA() {
  return (
    <section className="bg-brand-light py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-3xl lg:text-[40px] font-semibold font-montserrat text-brand-secondary tracking-tight">
          Know More About Us
        </h2>
        <Link
          href="#"
          className="bg-[#007066] hover:bg-brand-primary-dark text-white font-medium py-2.5 px-8 rounded-[10px] text-lg transition-colors whitespace-nowrap"
        >
          See Company Profile
        </Link>
      </div>
    </section>
  );
}
