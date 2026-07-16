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
  title: "Custom CBD Boxes | Custom Packaging Lane",
  description: "Premium custom CBD product boxes. Compliant packaging for CBD oil, edibles, and wellness products.",
};

export default function CBDBoxesPage() {
  const heroData = {
    breadcrumbLabel: "CBD Boxes",
    title: "Custom CBD Product Boxes",
    description: "Professional CBD packaging designed for compliance, protection, and brand presentation.",
    backLink: "/products",
  };

  const trustedBrands = [
    { id: "1", brand_name: "Brand A", brand_logo: null },
    { id: "2", brand_name: "Brand B", brand_logo: null },
    { id: "3", brand_name: "Brand C", brand_logo: null },
    { id: "4", brand_name: "Brand D", brand_logo: null },
  ];

  const featureBlocks = [
    { id: "1", icon: "/Product-categories/flexible.svg", title: "Flexible\nOrder Volume", description: "From low MOQs to high\nvolume production." },
    { id: "2", icon: "/Product-categories/fastest.svg", title: "FASTEST\nTURNAROUND", description: "7–10 business day lead\ntimes with free shipping." },
    { id: "3", icon: "/Product-categories/support.svg", title: "24/7 EXPERT\nSUPPORT", description: "Dedicated packaging\nspecialists available anytime" },
    { id: "4", icon: "/Product-categories/price-match.svg", title: "PRICE MATCH\nGUARANTEE", description: "Competitive pricing without\ncompromising quality." },
  ];

  const relatedProducts = [
    { id: "1", name: "CBD Oil Boxes", image: "/client-say-one.png" },
    { id: "2", name: "CBD Edible Packaging", image: "/client-say-two.png" },
    { id: "3", name: "Hemp Flower Boxes", image: "/client-say-three.png" },
    { id: "4", name: "CBD Topical Boxes", image: "/client-say-one.png" },
    { id: "5", name: "CBD Gift Sets", image: "/client-say-two.png" },
    { id: "6", name: "CBD Vape Boxes", image: "/client-say-three.png" },
    { id: "7", name: "Sample Kit Packaging", image: "/client-say-one.png" },
    { id: "8", name: "Multi-Product Boxes", image: "/client-say-two.png" },
    { id: "9", name: "CBD Wellness Boxes", image: "/client-say-three.png" },
    { id: "10", name: "Custom CBD Packaging", image: "/client-say-one.png" },
  ];

  const testimonials = [
    {
      id: "1",
      client_name: "Alex Thompson",
      client_title: "CEO",
      client_company: "Premium CBD Co.",
      rating: 5,
      content: "Professional packaging that meets all compliance requirements. Exactly what we needed for our CBD products.",
    },
    {
      id: "2",
      client_name: "Maria Garcia",
      client_title: "Operations Manager",
      client_company: "Wellness CBD Brand",
      rating: 5,
      content: "Compliance-friendly packaging with beautiful design. Great partner for our CBD business!",
    },
  ];

  const faqs = [
    {
      id: "1",
      question: "Are boxes compliant with CBD regulations?",
      answer: "Yes, we work with clients to ensure packaging meets local and federal regulations for proper labeling.",
    },
    {
      id: "2",
      question: "What packaging options for CBD oils?",
      answer: "We offer secure, protective boxes for bottles, including options with foam inserts for protection.",
    },
    {
      id: "3",
      question: "Can you accommodate CBD edible packaging?",
      answer: "Absolutely! Child-resistant features and compliant designs available for CBD edibles.",
    },
    {
      id: "4",
      question: "Do you support CBD product branding?",
      answer: "Yes! We understand CBD branding and can help with compliant, professional packaging design.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        <StaticProductHero {...heroData} />
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}

        {featureBlocks.length > 0 && (
          <section className="w-full" style={{ backgroundColor: '#F7F7F7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1140px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.id} className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10">
                      <Image src={block.icon} alt={block.title} width={40} height={40} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#05766E] leading-3 sm:leading-4 mb-0.5 sm:mb-1 whitespace-pre-line">{block.title}</h3>
                      <p className="text-[10px] sm:text-xs font-normal text-[#575757] whitespace-pre-line">{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-8 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <p className="text-xs sm:text-sm font-normal text-[#00756E]" style={{ fontFamily: 'Inter' }}>Our CBD Boxes Provide</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mt-2 sm:mt-3" style={{ fontFamily: 'Inter' }}>Compliance & Professional Branding</h2>
            </div>

            <div className="flex flex-col lg:relative lg:flex lg:justify-center lg:items-center">
              <div className="relative w-full flex justify-center items-center mb-8 sm:mb-12 lg:mb-0 order-2 lg:order-none">
                <div className="relative w-40 sm:w-48 lg:w-64 h-48 sm:h-64 lg:h-96 flex justify-center items-center">
                  <Image src="/Products-images/tuck-box-image.png" alt="CBD Box" width={300} height={400} className="object-contain w-full h-full" />
                </div>
              </div>

              <div className="w-full order-3 lg:order-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between">
                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:top-0 lg:left-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">✓</div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>Compliant Design</h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Proper label space and warning labels for CBD regulations</p>
                  </div>

                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:top-0 lg:right-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">✓</div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>Protective Packaging</h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Secure boxes with protective inserts for bottles</p>
                  </div>

                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:bottom-0 lg:left-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">✓</div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>Custom Sizing</h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Sizes for oils, edibles, topicals, and other products</p>
                  </div>

                  <div className="w-full lg:w-40 text-center mx-auto lg:absolute lg:bottom-0 lg:right-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#00756E] text-white flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg">🌿</div>
                    <h3 className="font-medium text-sm sm:text-base text-black mb-1 sm:mb-2" style={{ fontFamily: 'Inter' }}>Brand Building</h3>
                    <p className="font-medium text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>Professional design that builds customer trust</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-16 lg:pt-20 bg-white">
          <CustomizationSection />
        </section>

        {relatedProducts.length > 0 && <RelatedProductsCarousel products={relatedProducts} />}

        <QuoteForm />

        <section className="py-16 lg:py-20 bg-white">
          <div style={{ maxWidth: '1140px', margin: '0 auto', backgroundColor: '#F5F1EB', borderRadius: '14px', height: '500px', overflowY: 'auto', padding: '40px' }} className="mx-4 sm:mx-6 lg:mx-8">
            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>Premium Materials for CBD Product Packaging</h2>
              <p className="text-gray-700 mt-4 text-left">Professional packaging materials that protect your CBD products and meet compliance requirements. We offer solutions specifically designed for the CBD industry.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Food-grade paperboard</strong> - Compliant for CBD products</li>
                  <li><strong>Corrugated cardboard</strong> - Protective for bottles and jars</li>
                  <li><strong>White SBS board</strong> - Clean finish for professional branding</li>
                  <li><strong>Kraft paperboard</strong> - Eco-friendly CBD packaging option</li>
                  <li><strong>Rigid board</strong> - Premium protection for luxury CBD sets</li>
                  <li><strong>Specialty coatings</strong> - Added protection and barrier properties</li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>Premium Materials for CBD Product Packaging</h2>
              <p className="text-gray-700 mt-4 text-left">Professional packaging materials that protect your CBD products and meet compliance requirements. We offer solutions specifically designed for the CBD industry.</p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Food-grade paperboard</strong> - Compliant for CBD products</li>
                  <li><strong>Corrugated cardboard</strong> - Protective for bottles and jars</li>
                  <li><strong>White SBS board</strong> - Clean finish for professional branding</li>
                  <li><strong>Kraft paperboard</strong> - Eco-friendly CBD packaging option</li>
                  <li><strong>Rigid board</strong> - Premium protection for luxury CBD sets</li>
                  <li><strong>Specialty coatings</strong> - Added protection and barrier properties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        {faqs.length > 0 && <FAQ faqs={faqs} />}
        <SampleKitForm />

        <section className="py-16 lg:py-20 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Order?</h2>
            <p className="mb-8 max-w-2xl mx-auto">Get started with a free quote or request a sample kit to experience the quality firsthand</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">Get a Quote</button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">Request Sample</button>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
