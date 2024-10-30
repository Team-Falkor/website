import FeatureItem from "@/components/features/items/item";
import {
  CalendarDays,
  Code2,
  HardDrive,
  Puzzle,
  Rocket,
  Users,
} from "lucide-react";

const FeaturesItems = () => {
  return (
    <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-24 lg:px-8">
      <dl className="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-300 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
        <FeatureItem icon={<Users />} title="Plugins by Community." isAvailable>
          Enhance your gaming experience with plugins created by our community,
          tailored to your preferences.
        </FeatureItem>

        <FeatureItem icon={<CalendarDays />} title="Calendar">
          Stay ahead with our release calendar, marking the debut of new games
          so you never miss out on the latest titles.
        </FeatureItem>

        <FeatureItem
          icon={<Code2 />}
          title="Open Source."
          isAvailable
          link={"/github/app"}
        >
          Dive into a platform that thrives on collaboration and innovation,
          powered by an open-source ethos.
        </FeatureItem>

        <FeatureItem
          icon={<Puzzle />}
          title="Game Library Management."
          isAvailable={false}
        >
          Organize and manage your installed games effortlessly with our
          intuitive library system.
        </FeatureItem>

        <FeatureItem
          icon={<Rocket />}
          title="Launcher Integration."
          isAvailable={false}
        >
          Launch your games directly from the app, streamlining your playtime
          with our integrated launcher.
        </FeatureItem>

        <FeatureItem
          icon={<HardDrive />}
          title="Inbuilt Torrent Client."
          isAvailable={true}
        >
          Experience seamless file sharing with our integrated torrent client,
          designed for fast and secure transfers.
        </FeatureItem>
      </dl>
    </div>
  );
};

export default FeaturesItems;
