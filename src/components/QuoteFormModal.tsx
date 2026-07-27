"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { submitFormViaAjax, getFormData } from "@/lib/formSubmit";

type QuoteFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    // Get user IP
    const getIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
      } catch {
        setUserIp("Unknown");
      }
    };
    getIp();
  }, []);

  if (!isOpen) return null;

  const currentPageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageTitle = typeof document !== "undefined" ? document.title : "";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-lg w-full max-w-md h-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-6">
            Get a Quote
          </h2>

          <form
            onSubmit={async (e) => {
              console.log("🔘 Modal Quote Button clicked!");
              e.preventDefault();
              setLoading(true);
              setMessage("");

              const formElement = e.currentTarget;
              const formData = getFormData(formElement);

              // Convert checkbox to Yes/No
              const consentCheckbox = formElement.querySelector(
                'input[name="sms_consent"]'
              ) as HTMLInputElement;
              formData.sms_consent = consentCheckbox?.checked ? "Yes" : "No";

              console.log("📦 Modal Form data:", formData);
              formData.formType = "quote-modal";

              const response = await submitFormViaAjax(formData, "/api/form-submit", "/thank-you");
              console.log("🎯 Modal response:", response);

              if (!response.success) {
                setMessage("✗ " + response.message);
                setLoading(false);
              }
              // If successful, redirect happens automatically via submitFormViaAjax
            }}
            className="flex flex-col gap-4"
          >
            {/* Row 1: Full Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                  Full Name *
                </label>
                <input
                  name="Last_Name"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                  Email *
                </label>
                <input
                  name="Email"
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone and Material */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                  Phone *
                </label>
                <input
                  name="Phone"
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                  Material *
                </label>
                <select
                  name="Material"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors appearance-none cursor-pointer bg-white text-sm"
                  required
                >
                  <option value="">Choose material</option>
                  <option value="Corrugated Stock">Corrugated Stock</option>
                  <option value="Foil Metallic Cardstock">Foil Metallic</option>
                  <option value="Kraft-ecofriendly Brown Cardstock">Kraft Cardstock</option>
                  <option value="Rigid Press Board Card">Rigid Board</option>
                  <option value="Textured Neenah Cardstock">Textured Cardstock</option>
                  <option value="Colored Stock">Colored Stock</option>
                  <option value="Standard White Cardstock">White Cardstock</option>
                  <option value="Holographic Stock">Holographic Stock</option>
                </select>
              </div>
            </div>

            {/* Row 3: Description (Full Width) */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                Description *
              </label>
              <textarea
                name="Description"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-none text-sm"
                placeholder="Dimensions, materials, finishes..."
                required
              />
            </div>

            {/* SMS Consent */}
            <label className="flex items-start gap-2 mt-1">
              <input
                type="checkbox"
                name="sms_consent"
                className="mt-1"
                style={{ accentColor: "#00756E" }}
              />
              <span className="text-[11px] text-gray-600 leading-snug">
                I consent to receive SMS from Custom Packaging Lane
              </span>
            </label>

            {/* Hidden Fields */}
            <input type="hidden" name="IP" value={userIp} />
            <input type="hidden" name="Page_Title" value={pageTitle} />
            <input type="hidden" name="Full_Page_URL" value={currentPageUrl} />

            {/* Message */}
            {message && (
              <div
                className={`text-xs py-2 px-3 rounded text-center ${
                  message.startsWith("✓")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm"
            >
              {loading ? "Submitting..." : "Get a Quote"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
