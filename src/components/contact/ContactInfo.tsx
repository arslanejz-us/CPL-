import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ContactCard = {
  label: string;
  value: string;
  href?: string;
  Icon: LucideIcon;
};

const CARDS: ContactCard[] = [
  {
    label: "Email",
    value: "inquiry@custompackaginglane.com",
    href: "mailto:inquiry@custompackaginglane.com",
    Icon: Mail,
  },
  {
    label: "Call Center",
    value: "(833) 327-5627",
    href: "tel:8333275627",
    Icon: Phone,
  },
  {
    label: "Location",
    value:
      "1800 W Hawthorne Ln, West Chicago, IL 60185, United States Suite # 105",
    Icon: MapPin,
  },
  {
    label: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM EST",
    Icon: Clock,
  },
];

export default function ContactInfo() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-sm font-semibold font-montserrat text-brand-primary mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-[36px] font-medium font-montserrat text-brand-secondary leading-tight mb-5">
              Need Packaging for Your Business? Let&apos;s Talk.
            </h2>
            <p className="text-base text-[#575757] leading-relaxed max-w-[477px] mb-8">
              Connect with our packaging experts to discuss your needs, explore
              custom options and get clear answers before you begin.
            </p>
            <Link
              href="#quote"
              className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-dark text-white font-medium font-montserrat text-sm py-2.5 px-6 rounded-full transition-colors min-w-[191px]"
            >
              Begin Your Journey
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] sm:gap-x-[25px]">
            {CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-[#F7F7F7] border border-[#e8e8e8] rounded-[10px] px-6 py-5 min-h-[129px] flex flex-col"
              >
                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-md bg-brand-primary/10 text-brand-primary mb-3">
                  <card.Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <p className="text-[13px] font-semibold font-montserrat text-brand-secondary mb-1.5">
                  {card.label}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-[13px] text-[#575757] leading-snug hover:text-brand-primary transition-colors"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[13px] text-[#575757] leading-snug">
                    {card.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
