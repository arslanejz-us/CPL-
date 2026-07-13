import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ProcessTimeline from "@/components/ProcessTimeline";
import QuoteForm from "@/components/QuoteForm";
import WhyChoose from "@/components/about/WhyChoose";
import OurLocations from "@/components/about/OurLocations";
import SampleKitForm from "@/components/SampleKitForm";
import Newsletter from "@/components/Newsletter";

export const metadata = {
  title: "Contact Us | Custom Packaging Lane",
  description:
    "Get in touch with Custom Packaging Lane. Reach our packaging experts for quotes, custom options, and support — we respond within one business day.",
};

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <ContactHero />
        <ContactInfo />
        <ProcessTimeline />
        <QuoteForm />
        <WhyChoose />
        <OurLocations />
        <SampleKitForm showPricingButton />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
