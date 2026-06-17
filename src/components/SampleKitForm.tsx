"use client";

import Image from "next/image";
import sampleKitImg from "../../public/sample-kit-image.png";

const inputClass =
  "w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-2 text-sm text-white placeholder-white/70 transition-colors";

export default function SampleKitForm() {
  return (
    <section className="relative py-10 lg:py-12" id="sample-kit">
      {/* Full-section background image */}
      <Image
        src={sampleKitImg}
        alt="Free sample kit"
        fill
        className="object-cover object-right"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="justify-self-start bg-brand-primary-dark hover:bg-brand-primary-dark/80 text-white font-semibold py-2.5 px-10 rounded-md transition-colors mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
