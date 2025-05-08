import { HTMLAttributes } from "react";
import { cn } from "@/utils";

const H4 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	);
};

export default H4;
