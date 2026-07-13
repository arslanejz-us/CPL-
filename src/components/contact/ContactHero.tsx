import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import heroBg from "../../../public/about-us/hero-bg.png";

export default function ContactHero() {
  return (
    <section className="relative pt-12 pb-10 lg:pt-16 lg:pb-12 overflow-hidden">
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-[40px] font-medium font-montserrat text-brand-secondary mb-4">
          Contact Us
        </h1>
        <p className="text-base text-[#575757] max-w-[530px] mx-auto leading-relaxed mb-8">
          Have a question or need a quote? Reach out and our team will get back
          to you within one business day.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#quote"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
          >
            Get a Quote
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-brand-primary text-brand-secondary font-normal py-2.5 px-6 rounded-md text-sm transition-colors bg-white"
          >
            <Play className="w-3.5 h-3.5 fill-brand-secondary" />
            Browse Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
