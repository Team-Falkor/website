import { ChevronRight } from 'lucide-react';

const HeroBadges = () => {
  return (
    <div className="flex items-center justify-start w-full gap-x-5">
      <span className="px-3 py-1 text-sm font-semibold leading-6 text-purple-400 rounded-full bg-purple-700/25 ring-1 ring-inset ring-purple-700/40">
        App In Progress
      </span>
      <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
        Coming soon
        <ChevronRight />
      </span>
    </div>
  );
};

export default HeroBadges;
