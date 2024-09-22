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
          className: "items-center justify-center gap-2",
        })}
        href="https://discord.gg/5cxfH6ak9h"
      >
        Join The Discord
        <ChevronRight />
      </a>
    </div>
  );
};

export default HeroButtons;
