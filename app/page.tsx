import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LiveStats from "@/components/landing/LiveStats";
import Capabilities from "@/components/landing/Capabilities";
import HowItWorks from "@/components/landing/HowItWorks";
import AgentShowcase from "@/components/landing/AgentShowcase";
import VisionDemo from "@/components/landing/VisionDemo";
import APIPreview from "@/components/landing/APIPreview";
import FounderSection from "@/components/landing/FounderSection";
import TokenSection from "@/components/landing/TokenSection";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] relative">
      <Navbar />
      <Hero />
      <LiveStats />
      <Capabilities />
      <HowItWorks />
      <AgentShowcase />
      <VisionDemo />
      <APIPreview />
      <FounderSection />
      <TokenSection />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
