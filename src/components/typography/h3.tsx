import { cn } from "@/utils";
import { HTMLAttributes } from "react";

const H3 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export default H3;
