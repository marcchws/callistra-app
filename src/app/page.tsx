import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import StatsSection from "@/components/stats-section";
import TestimonialsSection from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import AboutSection from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import FooterSection from "@/components/footer-section";
import { CookieBanner } from "@/components/cookie-banner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
      <CookieBanner />
    </div>
  );
}
