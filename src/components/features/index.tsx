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
		src: "/app/app-calendar.webp",
		alt: "App Calendar Screenshot",
	},
	{
		src: "/app/app-home.webp",
		alt: "App Home Screenshot",
	},
	{
		src: "/app/app-home-2.webp",
		alt: "App Home 2 Screenshot",
	},
	{
		src: "/app/app-info-1.webp",
		alt: "App Info 1 Screenshot",
	},
	{
		src: "/app/app-info-2.webp",
		alt: "App Info 2 Screenshot",
	},
	{
		src: "/app/app-info-3.webp",
		alt: "App Info 3 Screenshot",
	},
	{
		src: "/app/app-library.webp",
		alt: "App Library Screenshot",
	},
	{
		src: "/app/app-profile.webp",
		alt: "App Profile Screenshot",
	},
	{
		src: "/app/app-settings.webp",
		alt: "App Settings Screenshot",
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
		<section className="relative mt-24 sm:mt-40" id="features">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				{/* Enhanced header section */}
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/20 rounded-full">
						<div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
						<span className="text-sm font-medium text-primary">
							Everything you need
						</span>
					</div>

					<h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
						<span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							Gaming,
						</span>{" "}
						Redefined!
					</h2>

					<p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
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
		</section>
	);
};

export default Features;
