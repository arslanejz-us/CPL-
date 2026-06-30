import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustriesList from "@/components/industries/IndustriesList";

export const metadata = {
  title: "Industries | Custom Packaging Lane",
  description: "Custom packaging solutions for every industry",
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <IndustriesHero />
        <IndustriesList />
      </main>
      <Footer />
    </>
  );
}
