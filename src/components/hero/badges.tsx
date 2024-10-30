import { ChevronRight } from "lucide-react";

const HeroBadges = () => {
  return (
    <div className="flex items-center justify-start w-full gap-x-5">
      <span className="px-3 py-1 text-sm font-semibold leading-6 text-orange-400 rounded-full bg-orange-700/25 ring-1 ring-inset ring-orange-800/40">
        Testing release 🎃
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium leading-6 text-gray-300">
        Testing Now
        <ChevronRight strokeWidth={3} />
      </span>
    </div>
  );
};

export default HeroBadges;
