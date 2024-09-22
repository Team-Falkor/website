import HeroBadges from "@/components/hero/badges";
import HeroButtons from "@/components/hero/buttons";
import Tilt from "react-parallax-tilt";

const HeroComponent = () => {
  return (
    <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-40 lg:flex lg:px-8 lg:pt-32">
      <div className="flex-shrink-0 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:pt-8">
        <img src="/icon.png" className="mb-6 size-16" />

        <HeroBadges />
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Falkor: Your Ultimate Gaming Hub
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Dive into Falkor, where a vast selection of games meets
          community-driven enhancements. Experience seamless, secure gaming,
          tailored for every platform, in one universal hub
        </p>
        <HeroButtons />
      </div>

      <Tilt tiltReverse={true} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-20 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
            <img
              src="/app-homepage.webp"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              alt="App Home Screen Screenshot"
            />
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default HeroComponent;
