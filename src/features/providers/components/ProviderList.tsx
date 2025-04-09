import { Provider } from "@/@types/providers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { ProviderCard } from "./cards/ProviderCard";

interface ProviderListProps {
  providers: Provider[];
  isLoading: boolean;
  error: Error | null;
}

export function ProviderList({
  providers,
  isLoading,
  error,
}: ProviderListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <CardHeader>
              <div className="h-7 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse mb-2" />
              <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>Failed to load providers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            There was an error loading the providers. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  if (!providers?.length) {
    return (
      <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle>No Community Providers</CardTitle>
          <CardDescription>
            Get started by adding the first community provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/plugins/providers/add">
              <Plus />
              Add Provider
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers.map((p) => {
        return <ProviderCard key={p.id} provider={p} />;
      })}
    </div>
  );
}
