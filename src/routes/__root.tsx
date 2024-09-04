import { ThemeProvider } from '@/components/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="relative overflow-hidden isolate">
      <ThemeProvider
        defaultTheme="dark"
        storageKey="falkor-ui-theme"
      >
        <Outlet />
      </ThemeProvider>
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
