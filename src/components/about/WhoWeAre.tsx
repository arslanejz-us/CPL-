import Image from "next/image";
import type { StaticImageData } from "next/image";
import tileCpl from "../../../public/about-us/partner-tiles/tile-cpl.png";
import tileHp from "../../../public/about-us/partner-tiles/tile-hp.png";
import tileIboxLight from "../../../public/about-us/partner-tiles/tile-ibox-light.png";
import tileIboxDark from "../../../public/about-us/partner-tiles/tile-ibox-dark.png";
import tilePackaging from "../../../public/about-us/partner-tiles/tile-packaging.png";

type Partner = {
  src: StaticImageData;
  alt: string;
  inner?: "white" | "dark";
  imageClass?: string;
};

const ROW_ONE: Partner[] = [
  {
    src: tileCpl,
    alt: "Custom Packaging Lane",
    inner: "white",
    imageClass: "invert",
  },
  {
    src: tileHp,
    alt: "Half Price Packaging",
    imageClass: "mix-blend-screen",
  },
];

const ROW_TWO: Partner[] = [
  {
    src: tileIboxLight,
    alt: "iBox Factory",
    inner: "white",
    imageClass: "invert",
  },
  {
    src: tileIboxDark,
    alt: "iBox Factory",
    inner: "dark",
  },
  {
    src: tilePackaging,
    alt: "Half Price Print Inc",
    inner: "dark",
  },
];

function PartnerTile({ partner }: { partner: Partner }) {
  const logo = (
    <Image
      src={partner.src}
      alt={partner.alt}
      className={`max-h-[80px] w-auto object-contain ${partner.imageClass ?? ""}`}
    />
  );

  return (
    <div className="w-full h-[125px] bg-[#F7F7F7] rounded-[10px] flex items-center justify-center p-2.5 overflow-hidden">
      {partner.inner ? (
        <div
          className={`flex h-[105px] w-full max-w-[287px] items-center justify-center rounded-[6px] px-4 ${
            partner.inner === "white" ? "bg-white" : "bg-[#1c1c1c]"
          }`}
        >
          {logo}
        </div>
      ) : (
        logo
      )}
    </div>
  );
}

export default function WhoWeAre() {
  return (
    <section className="py-8 sm:py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium font-montserrat text-brand-secondary text-center mb-3 sm:mb-6">
          Who we are
        </h2>
        <p className="text-sm sm:text-base text-[#575757] text-center max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
          Welcome to Custom Packaging Lane, where creativity meets innovation.
          Our mission is to go above and beyond your expectations by providing
          premium product packaging that showcases your brand in the best
          possible light. We believe that every package should be a work of art.
        </p>

        <div className="flex flex-col gap-6 items-center max-w-[1288px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[27px] w-full max-w-[847px]">
            {ROW_ONE.map((partner) => (
              <PartnerTile key={`${partner.alt}-row1`} partner={partner} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[27px] w-full">
            {ROW_TWO.map((partner, index) => (
              <PartnerTile
                key={`${partner.alt}-row2-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
