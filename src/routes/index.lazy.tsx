import FaQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import HeroComponent from "@/components/hero";
import MessageBanner from "@/components/message-banner";
import ParticleSystem from "@/components/particles";
import QuickInfo from "@/components/quickinfo";
import SvgBG from "@/components/svgBG";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="absolute inset-0 -z-[9]">
        <ParticleSystem />
      </div>

      <MessageBanner />
      <div className="p-2">
        <SvgBG />

        <HeroComponent />

        <QuickInfo />

        <FaQ />

        <Features />
      </div>
      <Footer />
    </div>
  );
}
