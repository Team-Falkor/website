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
          "bg-orange-700"
        )}
        to="/download"
      >
        Download Haunted Build 🎃
      </Link>

      <a
        className={buttonVariants({
          variant: "ghost",
          className: "items-center justify-center relative group",
        })}
        href={"/discord"}
      >
        Join The Haunted Discord 👻
        <div className="-translate-x-16 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-2 overflow-hidden">
          <ChevronRight strokeWidth={3} />
        </div>
      </a>
    </div>
  );
};

export default HeroButtons;
