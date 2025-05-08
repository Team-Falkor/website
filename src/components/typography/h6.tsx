import { HTMLAttributes } from "react";
import { cn } from "@/utils";

const H6 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h6
			className={cn(
				"scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	);
};

export default H6;
