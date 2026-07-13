import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SampleKitForm from "@/components/SampleKitForm";
import Newsletter from "@/components/Newsletter";

export const metadata = {
  title: "Privacy Policy | Custom Packaging Lane",
  description: "How we collect, use, and protect your information",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-r from-[#00756E] to-[#007066] border-b border-gray-300">
          {/* Gradient Fade Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white to-transparent pointer-events-none" style={{ background: 'linear-gradient(to top, white, rgba(255,255,255,0.7), rgba(0,117,110,0.3), transparent)' }}></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-white mb-4" style={{ fontSize: '40px', fontWeight: 500 }}>
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              How we collect, use, and protect your information
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Who we are */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Who we are</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website address is https://custompackaginglane.com.
              </p>
            </div>

            {/* Comments */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Comments</h2>
              <p className="text-gray-700 leading-relaxed">
                When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.
              </p>
            </div>

            {/* Media */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Media</h2>
              <p className="text-gray-700 leading-relaxed">
                If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year if you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and simply indicates the post ID of the article you just visited. It expires after 1 day.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you have an account and you log in to this site, we will set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
              </p>
            </div>

            {/* Embedded Content */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Embedded content from other websites</h2>
              <p className="text-gray-700 leading-relaxed">
                Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
              </p>
            </div>

            {/* Who we share data with */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Who we share your data with</h2>
              <p className="text-gray-700 leading-relaxed">
                If you request a password reset, your IP address will be included in the reset email.
              </p>
            </div>

            {/* How long we retain */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">How long we retain your data</h2>
              <p className="text-gray-700 leading-relaxed">
                If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue. For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
              </p>
            </div>

            {/* What rights you have */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">What rights you have over your data</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
              </p>
            </div>

            {/* Where data is sent */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Where your data is sent</h2>
              <p className="text-gray-700 leading-relaxed">
                Visitor comments may be checked through an automated spam detection service.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Kit Form */}
        <SampleKitForm />

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
