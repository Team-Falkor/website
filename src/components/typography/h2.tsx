import { HTMLAttributes } from "react";
import { cn } from "@/utils";

const H2 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	);
};

export default H2;
