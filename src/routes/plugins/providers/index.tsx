/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgBG from "@/components/svgBG";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProviders } from "@/features/providers/hooks/useProviders";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Plus, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/plugins/providers/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  // const [query, setQuery] = useState<string>("");

  const { providers, error, isLoading } = useProviders();

  const handleSearchClick = () => setSearchExpanded((prev) => !prev);

  return (
    <div>
      <div className="p-2 px-4 pb-16">
        <SvgBG />

        <div className="px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8">
          <div className="text-center">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Comminuty Providers
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg lg:text-xl">
              Explore a wide range of comminuty providers.
              <br />
              Connect to various sources to enhance your experience.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Comminuty Providers are run by third-party developers and are not
              affiliated with Falkor.
              <br />
              Comminuty Providers are not endorsed by Falkor or any of its
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

            <div className="ml-auto flex-1 sm:flex-initial relative">
              <div className="flex items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleSearchClick}
                  className="relative z-10"
                >
                  <Search />
                  <span className="sr-only">Search Providers</span>
                </Button>

                <div
                  className={`absolute right-0 top-0 flex items-center overflow-hidden transition-all duration-300 ${
                    searchExpanded
                      ? "w-full opacity-100 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                      : "w-0 opacity-0"
                  }`}
                >
                  <form className="w-full pl-8">
                    <Input
                      // ref={searchInputRef}
                      type="search"
                      placeholder="Search providers..."
                      className="w-full !ring-0"
                      // value={searchQuery}
                      // onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => setSearchExpanded(false)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
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
          ) : error ? (
            <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="text-red-500">Error</CardTitle>
                <CardDescription>Failed to load providers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  There was an error loading the providers. Please try again
                  later.
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </CardContent>
            </Card>
          ) : providers?.data ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {providers?.data.map((provider) => (
                <Card
                  key={provider?.setupJSON.id}
                  className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <CardHeader>
                    <CardTitle>{provider?.setupJSON?.name}</CardTitle>
                    <CardDescription>{provider?.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      {provider?.setupJSON?.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end items-end w-full">
                      <a
                        className={buttonVariants()}
                        href={`falkor://install-plugin/${provider.setupUrl}`}
                      >
                        <Download />
                        Install
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle>No Comminuty Providers</CardTitle>
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
          )}
        </div>
      </div>
    </div>
  );
}
