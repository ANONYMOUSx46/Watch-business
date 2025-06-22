import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

import { Gallery } from "@/components/Gallery";
import { TrustSignals } from "@/components/TrustSignals";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy transition-colors duration-300">
      <Navigation />
      <Hero />
      <Services />
      <Gallery />
      <TrustSignals />
      <Footer />
      <LiveChat />
    </div>
  );
}
