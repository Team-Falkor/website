import { Provider } from "@/@types/providers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Check, Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAdminProviders } from "../../hooks/useAdminProviders";

export function PendingProviderCard({
  id,
  setupUrl,
  createdAt,
  name,
  setupJSON,
}: Provider) {
  const {
    deleteError,
    deleteProvider,
    isDeletingProvider,
    approveError,
    approveProvider,
    isApprovingProvider,
  } = useAdminProviders();

  useEffect(() => {
    if (!deleteError) return;
    toast.error("Error deleting provider");
  }, [deleteError]);

  useEffect(() => {
    if (!approveError) return;
    toast.error("Error approving provider");
  }, [approveError]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      deleteProvider(id);
    }
  };

  const handleApprove = () => {
    if (window.confirm("Are you sure you want to approve this provider?")) {
      approveProvider(id);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="text-xl font-semibold truncate">{name}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              {format(new Date(createdAt), "PPp")}
            </span>
            <a
              href={setupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 break-all"
            >
              {setupUrl}
            </a>
            <p className="text-sm text-muted-foreground break-words">
              {setupJSON.description}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-muted rounded-md p-3 max-h-[300px] overflow-auto">
          <pre className="text-xs whitespace-pre-wrap break-words">
            <code>{JSON.stringify(setupJSON, null, 2)}</code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex-none space-y-3">
        <div className="w-full flex justify-end gap-2">
          <Button
            disabled={isDeletingProvider}
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
          >
            {isDeletingProvider ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Delete</span>
          </Button>
          <Button
            disabled={isApprovingProvider}
            onClick={handleApprove}
            size="sm"
            className="flex items-center gap-1"
          >
            {isApprovingProvider ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Approve</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
