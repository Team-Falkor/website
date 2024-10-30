import FeaturesImg from "@/components/features/img";
import FeaturesItems from "@/components/features/items";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const images: {
  src: string;
  alt: string;
}[] = [
  {
    src: "/app-info.webp",
    alt: "App Info Screenshot",
  },
  {
    src: "/app-info-2.webp",
    alt: "App Info Screenshot",
  },
  {
    src: "/app-info-3.webp",
    alt: "App Info Screenshot",
  },
  {
    src: "/app-library.webp",
    alt: "App Library Screenshot",
  },
];

const Features = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  return (
    <div className="mt-24 sm:mt-40" id="features">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-300">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-orange-400 sm:text-4xl">
            Gaming, Redefined!
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Dive into a realm where convenience meets mystery, with Falkor
            providing enchanted plugins, release calendars, and comprehensive
            game management in a spectral platform.
          </p>
        </div>
      </div>

      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {images.map(({ src, alt }) => (
            <CarouselItem key={src}>
              <FeaturesImg key={src} src={src} alt={alt} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <FeaturesItems />
    </div>
  );
};

export default Features;
