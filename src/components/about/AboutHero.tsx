import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import heroBg from "../../../public/about-us/hero-bg.png";

export default function AboutHero() {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-medium font-montserrat text-brand-secondary mb-3 sm:mb-4">
          About Us
        </h1>
        <p className="text-sm sm:text-base text-[#575757] max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
          We design and manufacture premium custom packaging that protects your
          products, elevates your brand and creates memorable unboxing
          experiences.
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
