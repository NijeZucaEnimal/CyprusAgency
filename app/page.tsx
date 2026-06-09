import { Hero } from "@/components/hero/Hero";
import { WhyNorthernCyprus } from "@/components/sections/WhyNorthernCyprus";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Regions } from "@/components/sections/Regions";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyNorthernCyprus />
      <FeaturedProperties />
      <Regions />
      <Services />
      <Stats />
      <Testimonials />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
