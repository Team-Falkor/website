import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import { ProviderList } from "@/features/providers/components/ProviderList";
import { SearchBar } from "@/features/providers/components/SearchBar";
import { useProviders } from "@/features/providers/hooks/useProviders";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/plugins/providers/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { providers, error, isLoading } = useProviders();

  const filteredProviders = providers?.data?.filter((p) => {
    if (!searchQuery) return true;
    const provider = JSON.parse(p.setupJSON as unknown as string);
    return (
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="p-2 px-4 pb-16">
        <SvgBG />

        <div className="px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8">
          <div className="text-center">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Community Providers
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg lg:text-xl">
              Explore a wide range of community providers.
              <br />
              Connect to various sources to enhance your experience.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Community Providers are run by third-party developers and are not
              affiliated with Falkor.
              <br />
              Community Providers are not endorsed by Falkor or any of its
              affiliates.
            </p>
          </div>
        </div>

        <div className="px-4 pt-12 mx-auto max-w-4xl sm:px-6 lg:max-w-6xl lg:pt-16">
          <div className="flex justify-between mb-6">
            <Button asChild>
              <Link to="/plugins/providers/add">
                <Plus className="mr-2 h-4 w-4" /> Add Provider
              </Link>
            </Button>

            <SearchBar onSearch={setSearchQuery} />
          </div>

          <ProviderList
            providers={filteredProviders || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
