// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "./components/theme-provider";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="falkor-ui-theme">
      <QueryClientProvider client={queryClient}>
        {/* <Toaster /> */}
        {/* <TorrentProvider> */}
        <RouterProvider router={router} />
        {/* </TorrentProvider> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
