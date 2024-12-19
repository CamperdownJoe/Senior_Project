import { infos } from "@/config/landing";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Testimonials from "@/components/sections/testimonials";
import { HomeFaq } from "@/components/sections/faq";

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <InfoLanding data={infos[0]} reverse={true} />
      <Features />
      <Testimonials />
      <HomeFaq />
    </>
  );
}
