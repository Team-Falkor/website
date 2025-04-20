import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils";
import { RoadmapEvent } from "@team-falkor/shared-types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";

interface EventCardProps {
  item: RoadmapEvent;
  index: number;
  expandedIndex: number | null;
  toggleExpand: (index: number) => void;
}

export const EventCard = ({
  item,
  index,
  expandedIndex,
  toggleExpand,
}: EventCardProps) => {
  const getStatusColor = (status: RoadmapEvent["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "IN_PROGRESS":
        return "text-yellow-500";
      case "PLANNED":
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={cn(
        "md:w-1/2 ml-5 sm:ml-0",
        index % 2 === 0 ? "md:pl-8" : "md:pr-8"
      )}
    >
      <motion.div
        layout
        className="w-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <div
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleExpand(index)}
            >
              <div>
                <h3 className="text-xl font-bold capitalize">
                  {item.phase.replace("_", " ")?.toLocaleLowerCase()} Phase
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CheckCircle
                    className={cn("w-4 h-4 mr-1", getStatusColor(item.status))}
                  />
                  {item.status?.replace("_", " ")}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="mb-4">
                      <ul className="grid grid-cols-1 gap-2 pl-3">
                        {[...(item?.items ?? [])].map((event, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <CheckCircle
                              className={cn(
                                "w-4 h-4 mr-2 mt-0.5 shrink-0",
                                event.completed
                                  ? "text-green-500"
                                  : "text-gray-400"
                              )}
                            />
                            <span className="text-sm">{event.title}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
