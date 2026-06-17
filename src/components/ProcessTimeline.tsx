import { ShoppingCart, Upload, Eye, Wrench, Truck } from "lucide-react";

const STEPS = [
  { num: "01", title: "Place Your Order", desc: "Submit your box style, size, quantity and finish.", Icon: ShoppingCart },
  { num: "02", title: "Share Your Design", desc: "Upload artwork or get free design support.", Icon: Upload },
  { num: "03", title: "Approve the Mockup", desc: "Review a 3D digital mockup for approval.", Icon: Eye },
  { num: "04", title: "Start Production", desc: "We print, cut and assemble your packaging.", Icon: Wrench },
  { num: "05", title: "On-Time Delivery", desc: "Your finished boxes ship and arrive on time.", Icon: Truck },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-white py-20 relative overflow-hidden" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary tracking-tight">
            5-Step Ordering Process
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            We provide the simplest 5-step ordering process to order custom packaging.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-4">
          {/* Connecting line — passes through the vertical center of the circles, edge-to-edge */}
          <div className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 w-screen h-0.5 bg-brand-primary/20" />

          {STEPS.map((step) => (
            <div key={step.num} className="relative flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md shadow-brand-primary/20 z-10">
                <step.Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="font-montserrat font-bold text-[25px] text-brand-primary mt-3 mb-2">{step.num}</p>
              <h3 className="font-montserrat font-bold text-[16px] text-brand-secondary">{step.title}</h3>
              <p className="font-montserrat font-normal text-[12px] leading-[16px] mt-1 max-w-[180px]" style={{ color: "#575757" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
