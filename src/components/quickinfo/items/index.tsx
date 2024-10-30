import QuickInfoItem from "@/components/quickinfo/items/item";
import { Code2, Ghost } from "lucide-react";
import { GiVampireDracula } from "react-icons/gi";

const QuickInfoItems = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <QuickInfoItem
          icon={<Ghost size={24} />}
          title="Community-Driven Scares"
        >
          Falkor harnesses community creativity, letting gamers add a touch of
          fright to their experience.
        </QuickInfoItem>

        <QuickInfoItem
          icon={<Code2 size={24} />}
          title="Open-Source Haunted Gaming"
        >
          Discover Falkor, where open-source meets gaming thrills in a platform
          of endless haunted possibilities.
        </QuickInfoItem>

        <QuickInfoItem
          icon={<GiVampireDracula size={24} />}
          title="Spooky UI for Frightful Navigation"
        >
          Dive into a modern UI with eerie ease through a vast, haunted
          universe.
        </QuickInfoItem>
      </dl>
    </div>
  );
};

export default QuickInfoItems;
