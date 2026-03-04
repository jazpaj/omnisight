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
import ParticleField from "@/components/landing/ParticleField";
import SectionDivider from "@/components/landing/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative noise-overlay">
      <ParticleField />
      <Navbar />
      <Hero />
      <LiveStats />
      <Capabilities />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <AgentShowcase />
      <SectionDivider />
      <VisionDemo />
      <SectionDivider />
      <APIPreview />
      <SectionDivider />
      <FounderSection />
      <TokenSection />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
