import { cn } from "@/utils";
import { HTMLAttributes } from "react";
import { ImageModal } from "../imageModal";

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const FeaturesImg = ({ src, alt, className, ...props }: Props) => {
  return (
    <div className="relative pt-16 overflow-hidden">
      <div className="relative px-6 mx-auto overflow-hidden max-w-7xl lg:px-8">
        <ImageModal
          src={src}
          alt={alt}
          className={cn(
            "w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10",
            className
          )}
          {...props}
        />
        <div className="absolute bottom-0 z-20 pointer-events-none opacity-65 bg-linear-to-t from-background to-transparent size-full" />
      </div>
    </div>
  );
};

export default FeaturesImg;
