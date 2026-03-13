import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { BentoGrid } from "@/components/landing/bento-grid";
import { AnalyticsPreview } from "@/components/landing/analytics-preview";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <AnalyticsPreview />
      <CTA />
    </main>
  );
}
