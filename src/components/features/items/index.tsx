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
			<dl className="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-300 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
				{items.map((item, i) => (
					<FeatureItem
						icon={item.icon}
						title={item.title}
						isAvailable={item.isAvailable ?? false}
						link={item.link}
						key={i}
					>
						{item.description}
					</FeatureItem>
				))}
			</dl>
		</div>
	);
};

export default FeaturesItems;
