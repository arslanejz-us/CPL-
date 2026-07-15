import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, Warehouse, ArrowUpRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import worldMapBg from "../../../public/about-us/world-map-bg.png";
import saleOfficeImg from "../../../public/about-us/location-sale-office.jpg";
import headOfficeImg from "../../../public/about-us/location-head-office.jpg";
import warehouseImg from "../../../public/about-us/location-warehouse.jpg";

type Location = {
  title: string;
  address: string[];
  Icon: LucideIcon;
  image: StaticImageData;
  mapsUrl: string;
};

const LOCATIONS: Location[] = [
  {
    title: "Sale Office",
    address: ["45300 Industrial place ,", "Suite 16 Fremont CA 94538"],
    Icon: MapPin,
    image: saleOfficeImg,
    mapsUrl:
      "https://maps.google.com/?q=45300+Industrial+Place+Suite+16+Fremont+CA+94538",
  },
  {
    title: "Head Office",
    address: [
      "1800 W Hawthorne Ln,",
      "West Chicago, IL 60185,",
      "United States Suite # 105",
    ],
    Icon: Building2,
    image: headOfficeImg,
    mapsUrl:
      "https://maps.google.com/?q=1800+W+Hawthorne+Ln+West+Chicago+IL+60185",
  },
  {
    title: "Warehouse",
    address: ["10 Clifton Blvd Suite B1,", "Clifton NJ 07011"],
    Icon: Warehouse,
    image: warehouseImg,
    mapsUrl:
      "https://maps.google.com/?q=10+Clifton+Blvd+Suite+B1+Clifton+NJ+07011",
  },
];

export default function OurLocations() {
  return (
    <section className="relative py-8 sm:py-14 lg:py-20 overflow-hidden">
      <Image
        src={worldMapBg}
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        sizes="100vw"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium font-montserrat text-brand-secondary text-center mb-3 sm:mb-4">
          Our Locations
        </h2>
        <p className="text-sm sm:text-base text-[#575757] text-center max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
          We serve customers through our locations around the globe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-9 justify-items-center">
          {LOCATIONS.map((location) => (
            <div
              key={location.title}
              className="w-full max-w-[334px] h-[420px] sm:h-[450px] bg-[#F7F7F7] rounded-[12px] border border-[#e8e8e8] flex flex-col overflow-hidden"
            >
              {/* Single building image per card */}
              <div className="relative mx-2 sm:mx-3 mt-2 sm:mt-3 h-[130px] sm:h-[170px] rounded-[10px] overflow-hidden shrink-0 bg-[#F7F7F7]">
                <Image
                  src={location.image}
                  alt={location.title}
                  fill
                  className="object-cover bg-[#F7F7F7]"
                  sizes="(max-width: 768px) 100vw, 334px"
                />
              </div>

              <div className="flex flex-col items-center text-center flex-1 px-3 sm:px-4 pt-3 sm:pt-5 pb-4 sm:pb-6">
                <div className="flex items-center justify-center w-12 sm:w-[55px] h-12 sm:h-[55px] rounded-full border-[2.5px] border-[#00756e] text-[#00756e] shrink-0">
                  <location.Icon className="w-5 sm:w-6 h-5 sm:h-6" strokeWidth={1.5} />
                </div>

                <div className="w-4 h-[1.5px] bg-[#00756e]/40 mt-2" />

                <h3 className="text-sm sm:text-[16px] font-bold font-montserrat text-[#00756e] mt-2 sm:mt-3 leading-none">
                  {location.title}
                </h3>

                <address className="not-italic text-[11px] sm:text-[12px] text-[#63625d] leading-4 sm:leading-5 mt-2">
                  {location.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <Link
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 border border-[#00756e] rounded-full px-5 h-[27px] text-[9px] font-semibold font-montserrat tracking-wide text-[#00756e] hover:bg-[#00756e]/5 transition-colors uppercase"
                >
                  <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.5} />
                  Get Directions
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
