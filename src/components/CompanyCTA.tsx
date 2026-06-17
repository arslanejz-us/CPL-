import Link from "next/link";

export default function CompanyCTA() {
  return (
    <section className="bg-brand-primary text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Know More About Us
        </h2>
        <Link
          href="#sustainability"
          className="bg-white text-brand-primary font-semibold py-3 px-7 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          See Company Profile
        </Link>
      </div>
    </section>
  );
}
