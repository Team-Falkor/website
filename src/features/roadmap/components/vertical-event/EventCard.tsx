import { RoadmapEvent } from "@team-falkor/shared-types";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";

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
        return "text-green-400";
      case "IN_PROGRESS":
        return "text-yellow-400";
      case "PLANNED":
      default:
        return "text-gray-400";
    }
  };

  const totalEvents = item?.items?.length ?? 0;
  const completedEvents = item?.items?.filter((event) => event.completed).length ?? 0;
  const progressPercentage = totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0;

	const getProgressColor = (progressPercentage: number) => {
		if (progressPercentage >= 80) return "bg-green-500/20";
		if (progressPercentage >= 50) return "bg-yellow-500/20";
		return "bg-red-500/20";
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
              className="p-6 cursor-pointer flex flex-col"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-center w-full">
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
              
              <div className="mt-4 w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Progress: {completedEvents} of {totalEvents} tasks
                  </span>
                  <span className="font-medium">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className={cn("h-2", getProgressColor(progressPercentage))} />
              </div>
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
