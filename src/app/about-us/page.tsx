import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import MeetTheTeam from "@/components/about/MeetTheTeam";
import MissionVision from "@/components/about/MissionVision";
import PackagingExperts from "@/components/about/PackagingExperts";
import WhyChoose from "@/components/about/WhyChoose";
import AboutCompanyCTA from "@/components/about/AboutCompanyCTA";
import OurLocations from "@/components/about/OurLocations";
import SampleKitForm from "@/components/SampleKitForm";
import Newsletter from "@/components/Newsletter";

export const metadata = {
  title: "About Us | Custom Packaging Lane",
  description:
    "Learn about Custom Packaging Lane — our team, mission, and locations. Premium custom packaging designed to protect your products and elevate your brand.",
};

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <WhoWeAre />
        <MeetTheTeam />
        <MissionVision />
        <PackagingExperts />
        <WhyChoose />
        <AboutCompanyCTA />
        <OurLocations />
        <SampleKitForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
