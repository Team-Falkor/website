import QuickInfoItem from '@/components/quickinfo/items/item';
import { Code2, Users, Zap } from 'lucide-react';

const QuickInfoItems = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <QuickInfoItem
          icon={<Users />}
          title="Community-Driven Enhancements"
        >
          Falkor harnesses community creativity, allowing gamers to personalize their experience with custom plugins and
          feedback-driven improvements.
        </QuickInfoItem>

        <QuickInfoItem
          icon={<Code2 />}
          title="Open-Source Gaming Revolution"
        >
          Discover Falkor, where open-source meets gaming, offering endless possibilities for exploration and innovation
          in a universally accessible platform.
        </QuickInfoItem>

        <QuickInfoItem
          icon={<Zap fill="white" />}
          title="Modern UI for Effortless Navigation"
        >
          Dive into Falkor, where a modern, intuitive UI ensures effortless navigation through a vast gaming universe,
          blending advanced security with peak performance for a seamless experience.
        </QuickInfoItem>
      </dl>
    </div>
  );
};

export default QuickInfoItems;
