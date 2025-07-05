import { Code2, Users, Zap } from "lucide-react";
import QuickInfoItem from "@/components/quickinfo/items/item";

const QuickInfoItems = () => {
	return (
		<div className="max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-24">
			{/* Enhanced grid with better responsive design and staggered animations */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				<QuickInfoItem
					icon={<Users className="w-6 h-6" />}
					title="Community-Driven Enhancements"
					className="animate-fade-in-up [animation-delay:0ms]"
				>
					Falkor harnesses community creativity, allowing gamers to personalize
					their experience with custom plugins and feedback-driven improvements.
				</QuickInfoItem>

				<QuickInfoItem
					icon={<Code2 className="w-6 h-6" />}
					title="Open-Source Gaming Revolution"
					className="animate-fade-in-up [animation-delay:150ms]"
				>
					Discover Falkor, where open-source meets gaming, offering endless
					possibilities for exploration and innovation in a universally
					accessible platform.
				</QuickInfoItem>

				<QuickInfoItem
					icon={<Zap className="w-6 h-6" />}
					title="Modern UI for Effortless Navigation"
					className="animate-fade-in-up [animation-delay:300ms] md:col-span-2 lg:col-span-1"
				>
					Dive into Falkor, where a modern, intuitive UI ensures effortless
					navigation through a vast gaming universe, blending advanced security
					with peak performance for a seamless experience.
				</QuickInfoItem>
			</div>
		</div>
	);
};

export default QuickInfoItems;
