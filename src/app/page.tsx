import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
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
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
      <CookieBanner />
    </div>
  );
}
