"use client";

import Image from "next/image";
import sampleKitImg from "../../public/sample-kit-image.png";

const inputClass =
  "w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-2 text-sm text-white placeholder-white/70 transition-colors";

type SampleKitFormProps = {
  showPricingButton?: boolean;
};

export default function SampleKitForm({
  showPricingButton = false,
}: SampleKitFormProps) {
  return (
    <section
      className="relative overflow-hidden bg-brand-primary-dark py-10 lg:min-h-[424px] lg:flex lg:items-center lg:py-12"
      id="sample-kit"
    >
      {/* Desktop: full-width banner image */}
      <Image
        src={sampleKitImg}
        alt=""
        fill
        className="hidden lg:block object-cover object-right pointer-events-none"
        sizes="100vw"
      />

      {/* Mobile / tablet: image anchored to top-right, fades into solid background */}
      <div className="absolute inset-x-0 top-0 h-[240px] sm:h-[280px] md:h-[320px] lg:hidden overflow-hidden pointer-events-none">
        <Image
          src={sampleKitImg}
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary-dark/10 via-brand-primary-dark/60 to-brand-primary-dark" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
            Order a Free Sample Kit
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
          >
            <input className={inputClass} placeholder="Full Name" />
            <input className={inputClass} type="email" placeholder="Email" />
            <input className={inputClass} type="tel" placeholder="Phone" />
            <input className={inputClass} placeholder="Company" />
            <input className={inputClass} placeholder="Total Quantity" />
            <input className={inputClass} placeholder="Address" />

            <label className="sm:col-span-2 flex items-start gap-2.5 mt-2">
              <input type="checkbox" className="mt-0.5 accent-white" />
              <span className="text-[11px] leading-snug text-white/80">
                You are agreeing to receive customer care related text messages
                from Custom Packaging Lane. Message frequency may vary. Standard
                Message and Data Rates may apply. Reply STOP to opt out. Reply
                HELP for help, privacy policy terms.
              </span>
            </label>

            <button
              type="submit"
              className={`justify-self-start bg-brand-primary-dark hover:bg-brand-primary-dark/80 text-white font-semibold py-2.5 rounded-md transition-colors mt-2 whitespace-nowrap border border-white/20 ${
                showPricingButton ? "px-6 sm:col-span-2 min-w-[290px]" : "px-10"
              }`}
            >
              {showPricingButton ? (
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  Order my sample kit
                  <span className="inline-flex items-center gap-1.5 font-normal">
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-white/70" />
                    $19.9
                  </span>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
