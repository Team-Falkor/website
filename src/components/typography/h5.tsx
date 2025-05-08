import { HTMLAttributes } from "react";
import { cn } from "@/utils";

const H5 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h5
			className={cn(
				"scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	);
};

export default H5;
