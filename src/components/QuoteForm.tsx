"use client";

import { useState } from "react";
import Image from "next/image";
import quoteBgImg from "../../public/Qutote-form-background-image.png";
import { submitFormViaAjax, getFormData } from "@/lib/formSubmit";

const inputClass =
  "w-full bg-white border border-gray-200 focus:border-brand-primary outline-none py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-colors placeholder-gray-400";

export default function QuoteForm() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <section className="relative py-8 lg:py-10" id="quote">
      {/* Full-section background image */}
      <Image
        src={quoteBgImg}
        alt="Custom packaging products"
        fill
        priority
        className="object-cover object-[20%_center]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:justify-end">
          {/* Form card floats on the right */}
          <div className="w-full lg:max-w-[520px] bg-white shadow-xl p-4 sm:p-6" style={{ borderRadius: '10px' }}>
            <h2 className="text-lg sm:text-2xl font-extrabold text-brand-primary tracking-tight text-center mb-3 sm:mb-4" style={{ fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Get a Quote in 15 Minutes
            </h2>

            <form
              onSubmit={async (e) => {
                console.log("🔘 Button clicked!");
                e.preventDefault();
                console.log("📝 Form submission started");
                setLoading(true);
                setMessage("");

                const formElement = e.currentTarget;
                console.log("📋 Form element:", formElement);
                const formData = getFormData(formElement);

                // Convert checkbox to Yes/No
                const consentCheckbox = formElement.querySelector('input[name="sms_consent"]') as HTMLInputElement;
                formData.sms_consent = consentCheckbox?.checked ? "Yes" : "No";

                console.log("📦 Extracted form data:", formData);
                formData.formType = "quote";

                const response = await submitFormViaAjax(formData, "/api/form-submit", "/thank-you");
                console.log("🎯 Final response:", response);
                if (!response.success) {
                  setMessage("✗ " + response.message);
                  setLoading(false);
                }
                // If successful, redirect happens automatically via submitFormViaAjax
              }}
              className="flex flex-col gap-2.5 sm:gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input name="Last_Name" className={inputClass} placeholder="Full Name*" style={{ borderRadius: '10px' }} required />
                <input name="Email" className={inputClass} type="email" placeholder="Email*" style={{ borderRadius: '10px' }} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input name="Phone" className={inputClass} type="tel" placeholder="Phone*" style={{ borderRadius: '10px' }} required />
                <input name="Total_Quantity" className={inputClass} placeholder="Total Quantity" style={{ borderRadius: '10px' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <select name="Material" className={`${inputClass} appearance-none cursor-pointer`} style={{ borderRadius: '10px' }}>
                  <option value="">Select material</option>
                  <option value="Corrugated Stock">Corrugated Stock</option>
                  <option value="Foil Metallic Cardstock">Foil Metallic Cardstock</option>
                  <option value="Kraft-ecofriendly Brown Cardstock">Kraft-ecofriendly Brown Cardstock</option>
                  <option value="Rigid Press Board Card">Rigid Press Board Card</option>
                  <option value="Textured Neenah Cardstock">Textured Neenah Cardstock</option>
                  <option value="Colored Stock">Colored Stock</option>
                  <option value="Standard White Cardstock">Standard White Cardstock</option>
                  <option value="Holographic Stock">Holographic Stock</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-2">
                <input name="Length" className={inputClass} placeholder="Length" style={{ borderRadius: '10px' }} type="number" />
                <input name="Width" className={inputClass} placeholder="Width" style={{ borderRadius: '10px' }} type="number" />
                <input name="Height" className={inputClass} placeholder="Height" style={{ borderRadius: '10px' }} type="number" />
                <select name="Unit" className={`${inputClass} appearance-none cursor-pointer`} style={{ borderRadius: '10px' }}>
                  <option value="Inches">Inches</option>
                  <option value="CM">CM</option>
                </select>
              </div>
              <textarea
                name="Description"
                rows={3}
                className="w-full bg-white border border-gray-200 focus:border-brand-primary outline-none py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-colors resize-none placeholder-gray-400"
                placeholder="Provide detailed packaging specifications including dimensions, materials, weight restrictions and design references and we'll get back to you with an instant quote."
                style={{ borderRadius: '10px', fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              />

              {/* File upload */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  Upload Your Design
                </p>
                <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 cursor-pointer">
                  <span className="flex-shrink-0 font-medium text-brand-secondary bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 hover:bg-gray-200 transition-colors whitespace-nowrap">
                    Choose File
                  </span>
                  <span className="truncate text-xs sm:text-sm">{fileName || "No File Chosen"}</span>
                  <input
                    type="file"
                    name="Attachment"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              {/* SMS Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="smsConsent"
                  name="sms_consent"
                  className="mt-1"
                  style={{ accentColor: '#00756E' }}
                />
                <label htmlFor="smsConsent" className="text-xs text-gray-500 leading-snug">
                  I consent to receive customer care related text messages from Custom Packaging Lane. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help.
                </label>
              </div>

              {message && (
                <div className={`text-sm py-2 px-3 rounded text-center ${message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 transition-colors mt-1 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: '10px', fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                {loading ? "Submitting..." : "Get a Quote"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
