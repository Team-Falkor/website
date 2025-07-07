import { useMemo } from "react";
import FeatureItem from "@/components/features/items/item";
import { featureItems } from "./items";

const FeaturesItems = () => {
	const items = useMemo(() => {
		return featureItems.sort((a, b) => {
			if (a.isAvailable && !b.isAvailable) return -1;
			if (!a.isAvailable && b.isAvailable) return 1;
			return 0;
		});
	}, []);

	return (
		<div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-24 lg:px-8">
			{/* Enhanced grid with better responsive design and staggered animations */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
				{items.map((item, i) => (
					<div
						key={i}
						className={`animate-fade-in-up [animation-delay:${i * 100}ms]`}
					>
						<FeatureItem
							icon={item.icon}
							title={item.title}
							isAvailable={item.isAvailable ?? false}
							link={item.link}
						>
							{item.description}
						</FeatureItem>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeaturesItems;
