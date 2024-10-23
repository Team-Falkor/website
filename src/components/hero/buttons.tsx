import { Button, buttonVariants } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";

const HeroButtons = () => {
  return (
    <div className="flex items-center mt-10 gap-x-6">
      <Button variant={"secondary"} className="bg-purple-700" disabled>
        Download Soon
      </Button>

      <a
        className={buttonVariants({
          variant: "ghost",
          className: "items-center justify-center relative group",
        })}
        href={"/discord"}
      >
        Join The Discord
        <div className="-translate-x-16 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-2 overflow-hidden">
          <ChevronRight strokeWidth={3} />
        </div>
      </a>
    </div>
  );
};

export default HeroButtons;
