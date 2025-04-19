/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAdminEvents } from "../hooks/admin/useAdminEvents";
import { useAdminMetrics } from "../hooks/admin/useAdminMetrics";
import { useAdminPageviews } from "../hooks/admin/useAdminPageviews";
import { useAdminTotalEvents } from "../hooks/admin/useAdminTotalEvents";
import { useAdminTotalPageviews } from "../hooks/admin/useAdminTotalPageviews";

import { EventsTable } from "./EventsTable";
import { MetricsCards } from "./MetricsCards";
import { PageviewsTable } from "./PageviewsTable";

export function AdminAnalytics() {
  const [period, setPeriod] = useState("day");

  // In a real implementation, these hooks would be used instead of mock data
  const { metrics, isLoadingMetrics } = useAdminMetrics(undefined, period);
  const { events, isLoadingEvents } = useAdminEvents(0, 10);
  const { pageviews, isLoadingPageviews } = useAdminPageviews(0, 10);
  const { data: totalEvents, isLoading: isLoadingTotalEvents } =
    useAdminTotalEvents();
  const { data: totalPageviews, isLoading: isLoadingTotalPageviews } =
    useAdminTotalPageviews();

  if (
    isLoadingMetrics ||
    isLoadingEvents ||
    isLoadingPageviews ||
    isLoadingTotalEvents ||
    isLoadingTotalPageviews
  ) {
    return (
      <div className="flex items-center justify-center h-full w-full p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="year">Last 365 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics Cards */}
      {!!metrics?.length && (
        <MetricsCards
          metrics={metrics}
          period={period}
          totalEvents={totalEvents}
          totalPageviews={totalPageviews}
        />
      )}

      {/* Tabs for Events and Pageviews */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="events" className="flex-1 sm:flex-none">
            Events
          </TabsTrigger>
          <TabsTrigger value="pageviews" className="flex-1 sm:flex-none">
            Pageviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4 mt-4">
          <EventsTable events={events} />
        </TabsContent>

        <TabsContent value="pageviews" className="space-y-4 mt-4">
          <PageviewsTable pageviews={pageviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
