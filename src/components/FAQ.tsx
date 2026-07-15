"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  id?: string;
  question?: string;
  answer?: string;
}

const DEFAULT_FAQS = [
  {
    question: "What is your standard turnaround time to deliver custom packaging?",
    answer: "We have different turnaround options available depending upon customer needs, but the standard turnaround time for the complete production and shipment of custom packaging and printing is 7-10 business days.",
  },
  {
    question: "How do I contact you to order custom packaging?",
    answer: "You can reach us by phone, email, or live chat, and our packaging specialists will guide you through placing your custom order.",
  },
  {
    question: "What type of printing options do you have for custom boxes?",
    answer: "We offer digital, offset, and flexographic printing along with finishes such as matte, gloss, soft-touch, spot UV, and foil stamping.",
  },
  {
    question: "How can I process my custom packaging order?",
    answer: "Simply request a quote, approve your 3D mockup, confirm your order, and we move it straight into production.",
  },
  {
    question: "What is the minimum quantity of custom boxes that I can order?",
    answer: "Our minimum order quantity starts at 100 units, making premium packaging accessible for businesses of every size.",
  },
  {
    question: "What packaging elements can I customize?",
    answer: "You can customize the box style, dimensions, material, printing, finish, inserts, and branding to fit your product.",
  },
];

export default function FAQ({ faqs }: { faqs?: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Use provided FAQs or fallback to default
  const faqList = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-secondary tracking-tight leading-tight">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-4">
              Find all the urgent questions you may have.
            </p>
          </div>

          {/* Right accordion */}
          <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
            {faqList.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div key={faq.id || index}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full text-left py-5 flex items-center justify-between gap-4"
                  >
                    <span className={`text-sm font-semibold ${isOpen ? "text-brand-primary" : "text-brand-secondary"}`}>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-brand-primary">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 -mt-1 text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
