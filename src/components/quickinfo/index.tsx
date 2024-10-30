import QuickInfoItems from "@/components/quickinfo/items";

const QuickInfo = () => {
  return (
    <div
      className="px-6 mx-auto mt-36 max-w-7xl sm:mt-32 lg:px-8"
      id="streamline-your-play"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-base font-semibold leading-7 text-orange-400">
          Streamline Your Spooky Play
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Instant Access to a World of Thrills 🎃
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Explore Falkor: A seamless gateway to thrilling games, connecting you
          to haunted adventures with just a few clicks.
        </p>
      </div>

      <QuickInfoItems />
    </div>
  );
};

export default QuickInfo;
