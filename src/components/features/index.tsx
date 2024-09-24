import FeaturesImg from "@/components/features/img";
import FeaturesItems from "@/components/features/items";

const Features = () => (
  <div className="mt-24 sm:mt-40">
    <div className="px-6 mx-auto max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto sm:text-center">
        <h2 className="text-base font-semibold leading-7 text-purple-400">
          Everything you need
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Gaming, Redefined!
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Dive into a universe where convenience meets innovation, with Falkor
          providing community plugins, release calendars, and comprehensive game
          management in one seamless platform.
        </p>
      </div>
    </div>

    <FeaturesImg />

    <FeaturesItems />
  </div>
);

export default Features;
