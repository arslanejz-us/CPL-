import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import Newsletter from "@/components/Newsletter";

export const metadata = {
  title: "Blog | Custom Packaging Lane",
  description: "Latest insights, tips, and trends in custom packaging",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <BlogHero />
        <BlogList />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
