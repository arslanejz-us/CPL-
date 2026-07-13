import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import Features from "@/components/Features";
import IndustryCategories from "@/components/IndustryCategories";
import ProcessTimeline from "@/components/ProcessTimeline";
import DeliveryVideo from "@/components/DeliveryVideo";
import PackagingStyles from "@/components/PackagingStyles";
import QuoteForm from "@/components/QuoteForm";
import Sustainability from "@/components/Sustainability";
import LiveBoxBuilder from "@/components/LiveBoxBuilder";
import CompanyCTA from "@/components/CompanyCTA";
import FAQ from "@/components/FAQ";
import SampleKitForm from "@/components/SampleKitForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="flex flex-col bg-white">
          {/* Above the fold: Hero + TrustedBrands */}
          <div className="h-screen flex flex-col overflow-hidden">
            <Hero />
            <TrustedBrands />
          </div>
          {/* Below fold: Features (scrollable) */}
          <div className="bg-[#F7F7F7]">
            <Features />
          </div>
        </section>
        <IndustryCategories />
        <ProcessTimeline />
        <DeliveryVideo />
        <PackagingStyles />
        <QuoteForm />
        <Sustainability />
        <LiveBoxBuilder />
        <CompanyCTA />
        <FAQ />
        <SampleKitForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
