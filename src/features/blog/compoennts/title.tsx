import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

const BlogTitle = ({ title, className, ...props }: Props) => {
  return (
    <h1
      className={cn(
        "text-4xl font-bold leading-tight text-primary mb-1 lg:text-5xl",
        className
      )}
      {...props}
    >
      {title}
    </h1>
  );
};

export default BlogTitle;
