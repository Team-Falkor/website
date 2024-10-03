import { cn } from "@/utils/utils.ts";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const FeaturesImg = ({ src, alt, className, ...props }: Props) => {
  return (
    <div className="relative pt-16 overflow-hidden">
      <div className="relative px-6 mx-auto overflow-hidden max-w-7xl lg:px-8">
        <img
          src={src}
          alt={alt}
          className={cn([
            "rounded-xl shadow-2xl ring-1 relative z-10 ring-white/10 object-contain",
            className,
          ])}
          {...props}
        />
        <div className="absolute bottom-0 z-20 pointer-events-none opacity-65 bg-gradient-to-t from-background to-transparent size-full" />
      </div>
    </div>
  );
};

export default FeaturesImg;
