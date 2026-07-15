import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import StaticProductHero from "@/components/StaticProductHero";
import TrustedBrands from "@/components/TrustedBrands";
import CustomizationSection from "@/components/CustomizationSection";
import RelatedProductsCarousel from "@/components/RelatedProductsCarousel";
import QuoteForm from "@/components/QuoteForm";
import SampleKitForm from "@/components/SampleKitForm";
import Image from "next/image";

export const metadata = {
  title: "Standard Custom Tuck Boxes | Custom Packaging Lane",
  description: "Premium standard custom tuck boxes perfect for retail packaging solutions.",
};

export default function StandardTuckBoxesProductPage() {
  // Hero Section Data
  const heroData = {
    breadcrumbLabel: "Standard Tuck Boxes",
    title: "Standard Custom Tuck Boxes",
    description: "Classic tuck box design engineered for optimal product protection and brand presentation.",
  };

  // Trusted Brands Data
  const trustedBrands = [
    { id: "1", brand_name: "Brand A", brand_logo: null },
    { id: "2", brand_name: "Brand B", brand_logo: null },
    { id: "3", brand_name: "Brand C", brand_logo: null },
    { id: "4", brand_name: "Brand D", brand_logo: null },
  ];

  // Feature Blocks Data
  const featureBlocks = [
    {
      id: "1",
      icon: "/Product-categories/flexible.svg",
      title: "Flexible\nOrder Volume",
      description: "From low MOQs to high\nvolume production.",
    },
    {
      id: "2",
      icon: "/Product-categories/fastest.svg",
      title: "FASTEST\nTURNAROUND",
      description: "7–10 business day lead\ntimes with free shipping.",
    },
    {
      id: "3",
      icon: "/Product-categories/support.svg",
      title: "24/7 EXPERT\nSUPPORT",
      description: "Dedicated packaging\nspecialists available anytime",
    },
    {
      id: "4",
      icon: "/Product-categories/price-match.svg",
      title: "PRICE MATCH\nGUARANTEE",
      description: "Competitive pricing without\ncompromising quality.",
    },
  ];

  // Related Products Data
  const relatedProducts = [
    {
      id: "1",
      name: "Straight Tuck End Box",
      image: "/client-say-one.png",
    },
    {
      id: "2",
      name: "Reverse Tuck End Box",
      image: "/client-say-two.png",
    },
    {
      id: "3",
      name: "Snap Lock Bottom Box",
      image: "/client-say-three.png",
    },
    {
      id: "4",
      name: "Roll End Tuck Box",
      image: "/client-say-one.png",
    },
    {
      id: "5",
      name: "Auto Lock Box",
      image: "/client-say-two.png",
    },
    {
      id: "6",
      name: "Kraft Tuck Top Box",
      image: "/client-say-three.png",
    },
    {
      id: "7",
      name: "Tuck Top Mailer Box",
      image: "/client-say-one.png",
    },
    {
      id: "8",
      name: "Tuck Top Box",
      image: "/client-say-two.png",
    },
    {
      id: "9",
      name: "Custom Tuck Box",
      image: "/client-say-three.png",
    },
    {
      id: "10",
      name: "Premium Tuck Box",
      image: "/client-say-one.png",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: "1",
      client_name: "Sarah Mitchell",
      client_title: "Brand Director",
      client_company: "Premium Cosmetics Co.",
      rating: 5,
      content: "The standard tuck boxes were exactly what we needed. Perfect quality at a competitive price.",
    },
    {
      id: "2",
      client_name: "James Chen",
      client_title: "Operations Manager",
      client_company: "Gourmet Foods Inc.",
      rating: 5,
      content: "Outstanding quality and the turnaround time was faster than expected.",
    },
  ];

  // FAQs
  const faqs = [
    {
      id: "1",
      question: "What sizes are available?",
      answer: "We offer fully customizable sizing. Typical sizes range from 2x2x2 to 12x12x12 inches, but we can manufacture custom dimensions.",
    },
    {
      id: "2",
      question: "What is the lead time?",
      answer: "Standard production takes 5-7 business days. Rush options available for 3-5 day delivery.",
    },
    {
      id: "3",
      question: "Can we get samples?",
      answer: "Yes! We provide free sample kits so you can evaluate quality and fit before full production.",
    },
    {
      id: "4",
      question: "Do you offer eco-friendly options?",
      answer: "Absolutely. All our cardboard is 100% recyclable and we use eco-friendly inks and coatings.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <StaticProductHero
          breadcrumbLabel={heroData.breadcrumbLabel}
          title={heroData.title}
          description={heroData.description}
          backLink="/product-category/custom-tuck-boxes"
        />

        {/* Trusted Brands */}
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}

        {/* Feature Blocks Section */}
        {featureBlocks.length > 0 && (
          <section className="w-full" style={{ backgroundColor: '#F7F7F7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1140px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.id} className="flex gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10">
                      <Image
                        src={block.icon}
                        alt={block.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* Title and Description */}
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#05766E] leading-3 sm:leading-4 mb-0.5 sm:mb-1 whitespace-pre-line">
                        {block.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-normal text-[#575757] whitespace-pre-line">
                        {block.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product Benefits Section */}
        <section className="py-8 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <p className="text-xs sm:text-sm font-normal text-[#00756E]" style={{ fontFamily: 'Inter' }}>
                Our Straight Tuck Boxes Make
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mt-2 sm:mt-3" style={{ fontFamily: 'Inter' }}>
                Packaging Easier & Quicker
              </h2>
            </div>

            {/* Mobile/Tablet: Stacked Layout | Desktop: Cards around image */}
            <div className="flex flex-col lg:relative lg:flex lg:justify-center lg:items-center">
              {/* Center Product Image */}
              <div className="relative w-full flex justify-center items-center mb-8 sm:mb-12 lg:mb-0 order-2 lg:order-none">
                <div className="relative w-40 sm:w-48 lg:w-64 h-48 sm:h-64 lg:h-96 flex justify-center items-center">
                  <Image
                    src="/Products-images/tuck-box-image.png"
                    alt="Tuck Box"
                    width={300}
                    height={400}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Cards - Responsive Grid */}
              <div className="w-full order-3 lg:order-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between">
                  {/* Top Left Card */}
                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:top-0 lg:left-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">
                      ✓
                    </div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>
                      Lightweight yet Durable
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      Tuck boxes are made from durable materials that offer strength and protection while
                    </p>
                  </div>

                  {/* Top Right Card */}
                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:top-0 lg:right-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">
                      ✓
                    </div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>
                      Easy to Assemble
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      Boxes can be put together by simple folding without glue, speeding up the whole
                    </p>
                  </div>

                  {/* Bottom Left Card */}
                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:bottom-0 lg:left-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">
                      ✓
                    </div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>
                      Lightweight yet Durable
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      Tuck boxes are made from durable materials that offer strength and protection while
                    </p>
                  </div>

                  {/* Bottom Right Card */}
                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:bottom-0 lg:right-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">
                      📦
                    </div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>
                      Space Efficient
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                      These boxes ship flat, helping you save on storage and shipping costs. Ideal for your
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Products Section */}
        <section className="pt-16 lg:pt-20 bg-white">
          <CustomizationSection />
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <RelatedProductsCarousel products={relatedProducts} />
        )}

        {/* Quote Form Section */}
        <QuoteForm />

        {/* Customization Details Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div style={{ maxWidth: '1140px', margin: '0 auto', backgroundColor: '#F5F1EB', borderRadius: '14px', height: '500px', overflowY: 'auto', padding: '40px' }} className="mx-4 sm:mx-6 lg:mx-8">
            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>
                Premium-Grade Materials Tailored for Your Product Safety and Print Quality
              </h2>
              <p className="text-gray-700 mt-4 text-left">
                The right material defines your product's look, feel, and protection. It's the foundation of your unboxing experience. At Custom Lane Packaging, we offer a range of materials for custom tuck boxes that align with your brand's purpose and product needs.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Coated kraft</strong> - A strong, versatile, eco-printable material used across most tuck box styles</li>
                  <li><strong>Paperboard</strong> - Lightweight yet sturdy, made from recycled or virgin pulp</li>
                  <li><strong>Specialty Papers</strong> - Premium finishes like kraft and linen for luxury appeal and branding</li>
                  <li><strong>Corrugated paper</strong> - Is durable and protective, ideal for heavy-duty or shipping packaging</li>
                  <li><strong>Rigid Chipboard</strong> - Offers superior protection and a luxurious feel, ideal for premium products</li>
                  <li><strong>Textured Papers</strong> - Offer linen, felt, or lush finishes for luxury tuck boxes</li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>
                Premium-Grade Materials Tailored for Your Product Safety and Print Quality
              </h2>
              <p className="text-gray-700 mt-4 text-left">
                The right material defines your product's look, feel, and protection. It's the foundation of your unboxing experience. At Custom Lane Packaging, we offer a range of materials for custom tuck boxes that align with your brand's purpose and product needs.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Coated kraft</strong> - A strong, versatile, eco-printable material used across most tuck box styles</li>
                  <li><strong>Paperboard</strong> - Lightweight yet sturdy, made from recycled or virgin pulp</li>
                  <li><strong>Specialty Papers</strong> - Premium finishes like kraft and linen for luxury appeal and branding</li>
                  <li><strong>Corrugated paper</strong> - Is durable and protective, ideal for heavy-duty or shipping packaging</li>
                  <li><strong>Rigid Chipboard</strong> - Offers superior protection and a luxurious feel, ideal for premium products</li>
                  <li><strong>Textured Papers</strong> - Offer linen, felt, or lush finishes for luxury tuck boxes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

        {/* FAQ */}
        {faqs.length > 0 && <FAQ faqs={faqs} />}

        {/* Sample Kit Form */}
        <SampleKitForm />

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Order?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Get started with a free quote or request a sample kit to experience the quality firsthand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get a Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Request Sample
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
