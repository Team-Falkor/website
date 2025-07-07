import QuickInfoItems from "@/components/quickinfo/items";

const QuickInfo = () => {
	return (
		<section
			className="relative px-6 mx-auto mt-36 max-w-7xl sm:mt-32 lg:px-8"
			id="streamline-your-play"
		>
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
			</div>

			{/* Enhanced header section with better typography and spacing */}
			<div className="max-w-4xl mx-auto text-center">
				<div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/20 rounded-full">
					<div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
					<span className="text-sm font-medium text-primary">
						Streamline Your Play
					</span>
				</div>

				<h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
					Instant Access to a{" "}
					<span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
						World of Games
					</span>
				</h2>

				<p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
					Explore Falkor: A seamless gateway to the latest games, connecting you
					to endless adventures with just a few clicks.
				</p>
			</div>

			<QuickInfoItems />
		</section>
	);
};

export default QuickInfo;
