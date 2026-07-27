import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessTimeline from "@/components/ProcessTimeline";
import { Phone, Mail, MapPin } from "lucide-react";

const styles = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fadeInDown {
    animation: fadeInDown 0.8s ease-out;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out;
  }

  .animate-scaleIn {
    animation: scaleIn 0.8s ease-out;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }

  .animate-delay-1 {
    animation-delay: 0.1s;
  }

  .animate-delay-2 {
    animation-delay: 0.2s;
  }

  .animate-delay-3 {
    animation-delay: 0.3s;
  }
`;

export default function ThankYouPage() {
  return (
    <>
      <style>{styles}</style>
      <Header />
      <main className="flex-grow">
        {/* Thank You Section */}
        <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-dark overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Thank You Content */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="mb-6 inline-block animate-scaleIn">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 animate-pulse-glow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full">
                    <svg className="w-8 h-8 text-brand-primary animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fadeInDown">
                Thank you
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fadeInDown animate-delay-1">
                Thank you for submitting your inquiry, our representative will contact you shortly.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
              {/* Phone */}
              <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 animate-fadeInUp">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-2 font-medium">Phone</p>
                  <a
                    href="tel:(650)242-8522"
                    className="text-lg font-bold text-white hover:text-white/80 transition-colors"
                  >
                    (650) 242-8522
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 animate-fadeInUp animate-delay-2">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Mail className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-2 font-medium">Email</p>
                  <a
                    href="mailto:inquiry@custompackaginglane.com"
                    className="text-lg font-bold text-white hover:text-white/80 transition-colors break-all"
                  >
                    inquiry@custompackaginglane.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 animate-fadeInUp animate-delay-3">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <MapPin className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70 mb-2 font-medium">Address</p>
                  <p className="text-lg font-bold text-white">
                    44288 Fremont Blvd, Fremont
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Ordering Process Section */}
        <ProcessTimeline />
      </main>
      <Footer />
    </>
  );
}
