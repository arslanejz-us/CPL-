import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";
import googleRating from "../../public/google-rating.png";
import trustpilot from "../../public/trustpilot.webp";
import womenOwned from "../../public/womenowned.webp";
import usps from "../../public/USPS.webp";
import dhl from "../../public/DHL.webp";
import fedex from "../../public/FedEx.webp";

const COLUMNS = [
  {
    title: "Company",
    links: [
      "About Us",
      "Blog",
      "Portfolio",
      "Industries",
      "Privacy Policy",
      "Shipping Policy",
      "Refund & Return Policy",
    ],
  },
  {
    title: "Products",
    links: [
      "Cosmetic Boxes",
      "Soap Boxes",
      "Candle Boxes",
      "CBD Boxes",
      "Retail Boxes",
      "View All",
    ],
  },
  {
    title: "Shapes & Styles",
    links: [
      "Custom Display Boxes",
      "Custom Mailer Boxes",
      "Custom Tuck Boxes",
      "Custom Rigid Boxes",
      "Window Boxes",
      "View All",
    ],
  },
];

const TRUST_BADGES = [
  { src: googleRating, alt: "Google Reviews" },
  { src: trustpilot, alt: "Trustpilot" },
  { src: womenOwned, alt: "Women Owned" },
];

const LOGISTICS = [
  { src: usps, alt: "USPS", className: "h-12 w-auto object-contain" },
  { src: dhl, alt: "DHL", className: "h-12 w-auto object-contain" },
  { src: fedex, alt: "FedEx", className: "h-8 w-auto object-contain" },
];

/* --- Social icons --- */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", color: "#1877F2" },
  { Icon: XIcon, label: "X", color: "#000000" },
  { Icon: InstagramIcon, label: "Instagram", color: "#E4405F" },
  { Icon: LinkedinIcon, label: "LinkedIn", color: "#0A66C2" },
  { Icon: YoutubeIcon, label: "YouTube", color: "#FF0000" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-light pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-brand-secondary mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-brand-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-brand-secondary mb-4">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li>
                <a href="tel:8533275627" className="underline hover:text-brand-primary transition-colors">
                  (853) 327-5627
                </a>
              </li>
              <li>
                <a href="mailto:inquiry@custompackaginglane.com" className="underline hover:text-brand-primary transition-colors break-all">
                  inquiry@custompackaginglane.com
                </a>
              </li>
              <li className="leading-relaxed">
                Head Office: 1800 W Hawthorne Ln, West Chicago, IL 60185, United States Suite #105
              </li>
              <li>
                <a href="#" className="underline hover:text-brand-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust + logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Where We're Trusted */}
          <div>
            <h4 className="text-lg font-bold text-brand-secondary mb-4">
              Where We&apos;re Trusted
            </h4>
            <div className="flex flex-wrap items-center gap-6">
              {TRUST_BADGES.map((b) => (
                <Image
                  key={b.alt}
                  src={b.src}
                  alt={b.alt}
                  className="h-12 w-auto object-contain"
                />
              ))}
            </div>
          </div>

          {/* Our Logistics Partners */}
          <div>
            <h4 className="text-lg font-bold text-brand-secondary mb-4">
              Our Logistics Partners
            </h4>
            <div className="flex flex-wrap items-center gap-10">
              {LOGISTICS.map((l) => (
                <Image
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  className={l.className}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center text-white">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xs font-bold tracking-[0.15em] text-brand-secondary font-display">CUSTOM</span>
              <span className="text-xs font-bold tracking-[0.15em] text-brand-secondary font-display -mt-0.5">PACKAGING LANE</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-gray-500 text-xs">© Custom Packaging Lane 2026</p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label, color }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-md flex items-center justify-center text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
