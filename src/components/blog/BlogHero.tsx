import Image from "next/image";
import heroBg from "../../../public/about-us/hero-bg.png";

export default function BlogHero() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-[40px] font-medium font-montserrat text-brand-secondary mb-4">
          Blog
        </h1>
        <p className="text-base text-[#575757] max-w-2xl mx-auto leading-relaxed">
          Find a variety of informative and engaging blogs, articles and other resources to help you stay up-to-date on the latest industry trends and insights.
        </p>
      </div>
    </section>
  );
}
