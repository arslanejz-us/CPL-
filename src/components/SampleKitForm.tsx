"use client";

import { useState } from "react";
import Image from "next/image";
import sampleKitImg from "../../public/sample-kit-image.png";
import { submitFormViaAjax, getFormData } from "@/lib/formSubmit";

const inputClass =
  "w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-2 text-sm text-white placeholder-white/70 transition-colors";

type SampleKitFormProps = {
  showPricingButton?: boolean;
};

export default function SampleKitForm({
  showPricingButton = false,
}: SampleKitFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setMessage("");

              const formElement = e.currentTarget;
              const formData = getFormData(formElement);

              // Convert checkbox to Yes/No
              const consentCheckbox = formElement.querySelector('input[name="sms_consent"]') as HTMLInputElement;
              formData.sms_consent = consentCheckbox?.checked ? "Yes" : "No";

              formData.formType = "sample-kit";

              const response = await submitFormViaAjax(formData, "/api/form-submit", "/thank-you");
              if (!response.success) {
                setMessage("✗ " + response.message);
                setLoading(false);
              }
              // If successful, redirect happens automatically via submitFormViaAjax
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
          >
            <input name="Last_Name" className={inputClass} placeholder="Full Name" required />
            <input name="Email" className={inputClass} type="email" placeholder="Email" required />
            <input name="Phone" className={inputClass} type="tel" placeholder="Phone" required />
            <input name="Company" className={inputClass} placeholder="Company" />
            <input name="Total_Quantity" className={inputClass} placeholder="Total Quantity" />
            <input name="Address" className={inputClass} placeholder="Address" />

            <label className="sm:col-span-2 flex items-start gap-2.5 mt-2">
              <input name="sms_consent" type="checkbox" className="mt-0.5 accent-white" required />
              <span className="text-[11px] leading-snug text-white/80">
                You are agreeing to receive customer care related text messages
                from Custom Packaging Lane. Message frequency may vary. Standard
                Message and Data Rates may apply. Reply STOP to opt out. Reply
                HELP for help, privacy policy terms.
              </span>
            </label>

            {message && (
              <div className={`sm:col-span-2 text-sm py-2 px-3 rounded text-center ${message.startsWith('✓') ? 'bg-green-100/20 text-green-100' : 'bg-red-100/20 text-red-100'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`justify-self-start bg-brand-primary-dark hover:bg-brand-primary-dark/80 text-white font-semibold py-2.5 rounded-md transition-colors mt-2 whitespace-nowrap border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                showPricingButton ? "px-6 sm:col-span-2 min-w-[290px]" : "px-10"
              }`}
            >
              {loading ? (
                "Submitting..."
              ) : showPricingButton ? (
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
