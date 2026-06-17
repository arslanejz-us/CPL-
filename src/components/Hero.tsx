import Link from "next/link";
import Image from "next/image";
import heroBg from "../../public/hero-section.png";
import { Button } from "@/components/ui/button";
import FlipWords from "@/components/FlipWords";

export default function Hero() {
  return (
    <section className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden bg-[#fbfbfa]">
      {/* Scattered product boxes */}
      <Image
        src={heroBg}
        alt="Custom printed packaging boxes"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Soft white wash so the centered text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-white/75" />

      <div className="relative z-10 text-center px-4 max-w-2xl py-12">
        <p className="font-montserrat font-normal text-[14px] leading-none uppercase text-brand-primary mb-5">
          Custom Retail Packaging - US-Based
        </p>

        <h1 className="font-display font-bold text-black text-[40px] leading-[40px] sm:text-[58px] sm:leading-[54px] lg:text-[72px] lg:leading-[66px]">
          Built to be
          <br />
          <FlipWords
            words={["unboxed", "Just unboxed"]}
            className="text-[#137B74]"
          />
        </h1>

        <p className="font-montserrat font-semibold text-[14px] leading-[20px] text-[#787572] max-w-xl mx-auto mt-6">
          We design and manufacture custom printed boxes that turn a delivery into
          a moment - for retail brands that care how they arrive.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <Button asChild size="lg">
            <Link href="#quote">Get a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#styles">Explore Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
