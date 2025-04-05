import SvgBG from "@/components/svgBG";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, constants } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/plugins/providers/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [url, setUrl] = useState<string>("");
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

  const isValidUrlFn = useCallback((url: string) => {
    try {
      const isValidUrl = new URL(url);
      setIsValidUrl(isValidUrl?.href?.includes("/setup.json"));
    } catch (e) {
      return false;
    }
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["providers", url],
    enabled: isValidUrl,
    queryFn: async () => {
      const res = await fetch(url);
      return await res.json();
    },
  });

  const { mutate, error: mutateError } = useMutation({
    mutationFn: async (url: string) => {
      return await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          setupUrl: url,
          setupJson: data,
        }),
      });
    },
  });

  useEffect(() => {
    if (!mutateError) return;
    alert(mutateError?.message);
  }, [mutateError]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <SvgBG />
      <Card className="w-full max-w-2xl bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle>Add Provider</CardTitle>
          <CardDescription>
            Enter the URL of your provider's setup.json file to add it to Falkor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 justify-between">
              <Input
                placeholder="https://example.com/setup.json"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  isValidUrlFn(e.target.value);
                }}
                type="url"
                className={cn("transition-all duration-200")}
              />
              <Button
                disabled={!isValidUrl}
                onClick={() => {
                  mutate(url);
                }}
              >
                <Plus /> Add Provider
              </Button>
            </div>
            <div className="relative rounded-lg border bg-muted/50 p-4">
              {!!isLoading && !!error && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              <pre className="overflow-auto max-h-[400px] text-sm">
                <code>
                  {error
                    ? "Error loading provider data"
                    : JSON.stringify(
                        data ?? constants.example_setup_json,
                        null,
                        2
                      )}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
