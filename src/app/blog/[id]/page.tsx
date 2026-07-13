import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, getBlogPosts } from "@/lib/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Blog | Custom Packaging Lane",
  description: "Read our latest packaging insights and industry tips",
};

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = BLOG_POSTS.find((p) => p.id === params.id);

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex-grow">
          <section className="py-24 lg:py-32 bg-[#F7F7F7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Blog Post Not Found
              </h1>
              <Link
                href="/blog"
                className="text-brand-primary hover:text-brand-primary-dark font-semibold"
              >
                Return to Blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Get all posts for navigation
  const allPosts = BLOG_POSTS;
  const currentIndex = allPosts.findIndex((p) => p.id === params.id);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="py-24 lg:py-32 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-4">
              {post.title}
            </h1>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-md border-2 border-gray-800 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <div></div>
              )}

              <Link
                href="/blog"
                className="text-brand-primary hover:text-brand-primary-dark font-semibold"
              >
                Back to Blog
              </Link>

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-md bg-brand-primary text-white font-semibold hover:bg-brand-primary-dark transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
