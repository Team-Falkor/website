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
import { PageView } from "../hooks/admin/useAdminPageviews";

interface PageviewsTableProps {
  pageviews: PageView[] | undefined | null;
}

export function PageviewsTable({ pageviews }: PageviewsTableProps) {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Pageviews</CardTitle>
        <CardDescription>
          A list of recent page views across the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead className="hidden sm:table-cell">Device</TableHead>
                <TableHead className="hidden md:table-cell">Browser</TableHead>
                <TableHead className="hidden lg:table-cell">Country</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageviews?.length ? (
                pageviews.map((pageview) => (
                  <TableRow key={pageview.id}>
                    <TableCell className="font-medium">
                      {pageview.path}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {pageview.deviceType}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {pageview.browser}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {pageview.country}
                    </TableCell>
                    <TableCell>{formatTimestamp(pageview.timestamp)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No pageviews found
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
