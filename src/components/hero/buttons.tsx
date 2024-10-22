import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { Link } from "@tanstack/react-router";

import { ChevronRight } from "lucide-react";

const HeroButtons = () => {
  return (
    <div className="flex items-center mt-10 gap-x-6">
      <Link
        className={cn(
          buttonVariants({
            variant: "secondary",
          }),
          "bg-purple-700"
        )}
        to="/download"
      >
        Download Test Build
      </Link>

      <a
        className={buttonVariants({
          variant: "ghost",
          className: "items-center justify-center gap-2",
        })}
        href={"/discord"}
      >
        Join The Discord
        <ChevronRight />
      </a>
    </div>
  );
};

export default HeroButtons;
