import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Globe, Users } from "lucide-react";
import { AggregateMetric } from "../hooks/admin/useAdminMetrics";

interface MetricsCardsProps {
  metrics: AggregateMetric[] | undefined | null;
  period: string;
  totalEvents: { count: number } | undefined;
  totalPageviews: { count: number } | undefined;
}

export function MetricsCards({
  metrics,
  period,
  totalEvents,
  totalPageviews,
}: MetricsCardsProps) {
  const allMetrics = [
    ...(metrics?.length ? metrics : []),
    ...(totalEvents
      ? [
          {
            id: "total-events",
            metricType: "totalEvents",
            value: totalEvents.count,
            period: "all",
          },
        ]
      : []),
    ...(totalPageviews
      ? [
          {
            id: "total-pageviews",
            metricType: "totalPageviews",
            value: totalPageviews.count,
            period: "all",
          },
        ]
      : []),
  ];

  const getMetricIcon = (metricType: string) => {
    switch (metricType) {
      case "totalUsers":
      case "activeUsers":
        return (
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        );
      case "pageViews":
      case "totalPageviews":
        return (
          <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        );
      case "totalEvents":
        return (
          <BarChart3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        );
      case "avgSessionDuration":
        return (
          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        );
      default:
        return (
          <BarChart3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        );
    }
  };

  const getMetricTitle = (metricType: string) => {
    switch (metricType) {
      case "totalUsers":
        return "Total Users";
      case "activeUsers":
        return "Active Users";
      case "pageViews":
        return "Page Views";
      case "totalPageviews":
        return "Total Page Views";
      case "totalEvents":
        return "Total Events";
      case "avgSessionDuration":
        return "Avg. Session Duration";
      default:
        return metricType;
    }
  };

  const formatMetricValue = (metricType: string, value: number) => {
    if (metricType === "avgSessionDuration") {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {allMetrics?.length ? (
        allMetrics.map((metric) => (
          <Card key={metric.id} className="h-full flex flex-col">
            <CardHeader className="flex items-center justify-between pb-2 min-w-0">
              <CardTitle className="flex-1 text-sm font-medium truncate">
                {getMetricTitle(metric.metricType)}
              </CardTitle>
              {getMetricIcon(metric.metricType)}
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="text-2xl font-bold">
                {formatMetricValue(metric.metricType, metric.value)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.period === "all"
                  ? "All time"
                  : period === "day"
                    ? "Last 24 hours"
                    : period === "week"
                      ? "Last 7 days"
                      : period === "month"
                        ? "Last 30 days"
                        : "Last 365 days"}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-4">No metrics available</div>
      )}
    </div>
  );
}
