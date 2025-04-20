import { RoadmapEventData } from "@team-falkor/shared-types";
import { useState } from "react";
import { DateBadge } from "./DateBadge";
import { EventCard } from "./EventCard";
import { TimelineDot } from "./TimelineDot";

type VerticalEventTimelineProps = {
  events: Array<RoadmapEventData>;
  title?: string;
  subtitle?: string;
  initialExpandedIndex?: number | null;
};

export const VerticalEventTimeline = ({
  events,
  title = "App Roadmap",
  subtitle = "Our development journey and milestones",
  initialExpandedIndex = 0,
}: VerticalEventTimelineProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    initialExpandedIndex
  );

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(null);
      const timer = setTimeout(() => {
        setExpandedIndex(index);
        clearTimeout(timer);
      }, 300);
    }
  };

  return (
    <div className="mx-auto px-4 py-28 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        {title}
      </h1>
      <p className="text-muted-foreground text-center mb-12">{subtitle}</p>
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/20 z-0"></div>
        {events.map((item, index) => (
          <div
            key={index}
            className={`mb-12 relative z-10 flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <TimelineDot />
            <DateBadge phase={item.phase} index={index} />
            <EventCard
              item={item}
              index={index}
              expandedIndex={expandedIndex}
              toggleExpand={toggleExpand}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
