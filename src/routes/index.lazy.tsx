import Features from '@/components/features';
import HeroComponent from '@/components/hero';
import QuickInfo from '@/components/quickinfo';
import SvgBG from '@/components/svgBG';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <SvgBG />

      <HeroComponent />

      <QuickInfo />

      <Features />
    </div>
  );
}
