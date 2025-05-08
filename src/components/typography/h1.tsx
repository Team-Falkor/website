import { HTMLAttributes } from "react";
import { cn } from "@/utils";

const H1 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className,
			)}
			{...props}
		/>
	);
};

export default H1;
