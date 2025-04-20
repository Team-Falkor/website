import { Event } from "@/@types/events";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface DateBadgeProps {
  phase: Event["phase"];
  index: number;
}

export const DateBadge = ({ phase, index }: DateBadgeProps) => (
  <div
    className={`md:w-1/2 flex ${
      index % 2 === 0 ? "md:justify-end md:pr-8" : "md:justify-start md:pl-8"
    }`}
  >
    <motion.div
      className="mb-4 md:mb-0 ml-5 sm:ml-0"
      whileHover={{ scale: 1.05 }}
    >
      <Badge
        variant="outline"
        className="text-sm py-1 px-3 bg-primary/5 border-primary/20 capitalize"
      >
        <CalendarDays className="size-4 mr-2" />
        {phase?.replace("-", " ")}
      </Badge>
    </motion.div>
  </div>
);
