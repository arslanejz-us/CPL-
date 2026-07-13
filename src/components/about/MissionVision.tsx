import Image from "next/image";
import mission1 from "../../../public/about-us/mission-1.jpg";
import mission2 from "../../../public/about-us/mission-2.jpg";
import mission3 from "../../../public/about-us/mission-3.jpg";
import mission4 from "../../../public/about-us/mission-4.jpg";

export default function MissionVision() {
  return (
    <section className="py-14 lg:py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 relative h-48 sm:h-56 rounded-lg overflow-hidden">
              <Image
                src={mission1}
                alt="Custom packaging showcase"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-36 sm:h-44 rounded-lg overflow-hidden">
              <Image
                src={mission3}
                alt="Packaging materials"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-36 sm:h-44 rounded-lg overflow-hidden">
              <Image
                src={mission2}
                alt="Product boxes"
                fill
                className="object-cover"
              />
            </div>
            <div className="col-span-2 relative h-36 sm:h-44 rounded-lg overflow-hidden">
              <Image
                src={mission4}
                alt="Branded packaging"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div>
            <h2 className="text-3xl sm:text-[40px] font-medium font-montserrat text-brand-secondary mb-6">
              Our Mission &amp; Vision
            </h2>
            <p className="text-base text-[#575757] leading-[29px]">
              At Custom Packaging Lane, our mission is to revolutionize the
              packaging industry by providing innovative and personalized
              solutions for businesses. We are committed to using sustainable
              materials and state-of-the-art technology to create custom
              packaging that not only meets but exceeds our client&apos;s
              expectations. Our goal is to help our clients stand out in the
              marketplace by delivering high-quality packaging that reflects
              their unique brand identity. We take pride in our team&apos;s
              ability to provide exceptional customer service and support. Join
              us on our mission to redefine the packaging industry and elevate
              your business to new heights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
