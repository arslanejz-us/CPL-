import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import TrustedBrands from "@/components/TrustedBrands";
import StaticCategoryHero from "@/components/StaticCategoryHero";
import CustomizationSection from "@/components/CustomizationSection";
import QuoteForm from "@/components/QuoteForm";
import SampleKitForm from "@/components/SampleKitForm";
import Image from "next/image";

export const metadata = {
  title: "Rigid Boxes | Custom Packaging Lane",
  description: "Premium rigid boxes for luxury brand packaging and product protection.",
};

export default function RigidBoxesPage() {
  const heroData = {
    breadcrumbLabel: "Rigid Boxes",
    title: "Rigid Boxes",
    description: "Premium rigid boxes engineered for luxury packaging. Perfect for high-end products requiring superior protection and presentation.",
  };

  const types = [
    { id: "1", name: "Standard Rigid Box", image: "/client-say-one.png" },
    { id: "2", name: "Magnetic Closure Box", image: "/client-say-two.png" },
    { id: "3", name: "Book-Style Box", image: "/client-say-three.png" },
    { id: "4", name: "Drawer-Style Box", image: "/client-say-one.png" },
    { id: "5", name: "Two-Piece Box", image: "/client-say-two.png" },
    { id: "6", name: "Luxury Gift Box", image: "/client-say-three.png" },
    { id: "7", name: "Custom Rigid Box", image: "/client-say-one.png" },
    { id: "8", name: "Premium Rigid Box", image: "/client-say-two.png" },
  ];

  const featureBlocks = [
    { id: "1", icon: "/Product-categories/flexible.svg", title: "Flexible\nOrder Volume", description: "From low MOQs to high\nvolume production." },
    { id: "2", icon: "/Product-categories/fastest.svg", title: "FASTEST\nTURNAROUND", description: "7–10 business day lead\ntimes with free shipping." },
    { id: "3", icon: "/Product-categories/support.svg", title: "24/7 EXPERT\nSUPPORT", description: "Dedicated packaging\nspecialists available anytime" },
    { id: "4", icon: "/Product-categories/price-match.svg", title: "PRICE MATCH\nGUARANTEE", description: "Competitive pricing without\ncompromising quality." },
  ];

  const testimonials = [
    { id: "1", client_name: "Sarah Mitchell", client_company: "Luxury Cosmetics Co.", rating: 5, content: "Exceptional quality rigid boxes. Perfect for our premium brand!" },
    { id: "2", client_name: "James Chen", client_company: "High-End Goods Inc.", rating: 5, content: "Luxury packaging that exceeds our expectations. Highly recommended!" },
    { id: "3", client_name: "Emily Rodriguez", client_company: "Premium Brands Ltd.", rating: 5, content: "These rigid boxes elevate our brand. Customers love them!" },
  ];

  const faqs = [
    { id: "1", question: "What makes rigid boxes different?", answer: "Rigid boxes provide superior protection and a premium feel compared to standard boxes." },
    { id: "2", question: "How long does production take?", answer: "Standard production takes 7-10 business days. Rush options available." },
    { id: "3", question: "Can you customize every aspect?", answer: "Yes! Full customization available for materials, size, design, and finishes." },
    { id: "4", question: "Do you offer finishing options?", answer: "Yes! Embossing, foil stamping, spot UV, and more." },
  ];

  const trustedBrands = [
    { id: "1", brand_name: "Brand A", brand_logo: undefined },
    { id: "2", brand_name: "Brand B", brand_logo: undefined },
    { id: "3", brand_name: "Brand C", brand_logo: undefined },
    { id: "4", brand_name: "Brand D", brand_logo: undefined },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        <StaticCategoryHero breadcrumbLabel={heroData.breadcrumbLabel} title={heroData.title} description={heroData.description} />
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}
        {featureBlocks.length > 0 && (
          <section className="w-full" style={{ backgroundColor: '#F7F7F7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1140px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image src={block.icon} alt={block.title} width={40} height={40} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#05766E] leading-4 mb-1 whitespace-pre-line">{block.title}</h3>
                      <p className="text-xs font-normal text-[#575757] whitespace-pre-line">{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {types.length > 0 && (
          <section className="pt-16 lg:pt-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-2 sm:mb-4" style={{ fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>Types of Rigid Boxes</h2>
                <p className="text-sm sm:text-base font-normal text-[#575757] max-w-2xl mx-auto" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>Explore our premium rigid box collection for luxury packaging solutions.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {types.map((type) => (
                  <div key={type.id} className="flex flex-col">
                    <div className="relative w-full mb-4" style={{ height: '344px' }}>
                      <Image src={type.image} alt={type.name} fill className="object-cover rounded-[28px]" />
                    </div>
                    <h3 className="text-base font-normal text-black text-left">{type.name}</h3>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-8 transition-colors" style={{ borderRadius: '10px' }}>Request a Quote</button>
                <button className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 px-8 transition-colors" style={{ borderRadius: '10px' }}>View All</button>
              </div>
            </div>
          </section>
        )}
        <section className="pt-16 lg:pt-20 bg-white">
          <CustomizationSection />
        </section>
        <QuoteForm />
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        <section className="py-16 lg:py-20 bg-white">
          <div style={{ maxWidth: '1140px', margin: '0 auto', backgroundColor: '#F5F1EB', borderRadius: '14px', height: '500px', overflowY: 'auto', padding: '40px' }} className="mx-4 sm:mx-6 lg:mx-8">
            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>Premium Rigid Box Materials and Finishes</h2>
              <p className="text-gray-700 mt-4 text-left">Luxury materials and finishes for premium brand presentation.</p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Rigid paperboard</strong> - Premium structural integrity</li>
                  <li><strong>Luxury linen</strong> - Premium fabric-covered boxes</li>
                  <li><strong>Embossed finishes</strong> - Tactile luxury appeal</li>
                  <li><strong>Foil stamping</strong> - Gold and silver accents</li>
                  <li><strong>Spot UV coating</strong> - Selective high-gloss finish</li>
                  <li><strong>Custom inserts</strong> - Velvet and silk linings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {faqs.length > 0 && <FAQ faqs={faqs} />}
        <SampleKitForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
