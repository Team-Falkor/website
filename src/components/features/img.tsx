const FeaturesImg = () => {
  return (
    <div className="relative pt-16 overflow-hidden">
      <div className="relative px-6 mx-auto overflow-hidden max-w-7xl lg:px-8">
        <img
          src="/app-info.webp"
          alt="App Info Screen Screenshot"
          className="mb-[-12%] rounded-xl shadow-2xl ring-1 relative z-10 ring-white/10 object-cover"
        />
        <div className="absolute bottom-0 z-20 pointer-events-none opacity-65 bg-gradient-to-t from-background to-transparent size-full" />
      </div>
    </div>
  );
};

export default FeaturesImg;
