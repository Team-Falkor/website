import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import FeaturesImg from "@/components/features/img";
import FeaturesItems from "@/components/features/items";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const images: {
	src: string;
	alt: string;
}[] = [
	{
		src: "/app/home.webp",
		alt: "App Home Screenshot",
	},
	{
		src: "/app/info-1.webp",
		alt: "App Info Screenshot",
	},
	{
		src: "/app/info-2.webp",
		alt: "App Info Screenshot",
	},
	{
		src: "/app/info-3.webp",
		alt: "App Info Screenshot",
	},
	{
		src: "/app/library.webp",
		alt: "App Library Screenshot",
	},
	{
		src: "/app/library-2.webp",
		alt: "App Library Screenshot",
	},
];

const Features = () => {
	const autoplay = useRef(
		Autoplay({
			delay: 5000,
			stopOnInteraction: true,
			stopOnMouseEnter: true,
			stopOnFocusIn: true,
		}),
	);

	return (
		<div className="mt-24 sm:mt-40" id="features">
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
						providing community plugins, release calendars, and comprehensive
						game management in one seamless platform.
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
