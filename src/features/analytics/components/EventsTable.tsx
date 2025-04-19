import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventLog } from "../hooks/admin/useAdminEvents";

interface EventsTableProps {
  events: EventLog[] | null | undefined;
}

export function EventsTable({ events }: EventsTableProps) {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
        <CardDescription>
          A list of recent events tracked across the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Path</TableHead>
                <TableHead className="hidden md:table-cell">
                  Session ID
                </TableHead>
                <TableHead className="hidden lg:table-cell">Context</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.length ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      {event.eventType}
                    </TableCell>
                    <TableCell>{event.path}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {event.sessionId}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {JSON.stringify(event.context).substring(0, 30)}...
                    </TableCell>
                    <TableCell>{formatTimestamp(event.timestamp)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
