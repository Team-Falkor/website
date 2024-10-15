import { cn } from "@/utils";
import { HTMLAttributes } from "react";

const H4 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export default H4;
