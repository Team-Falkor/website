import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
}

export function DynamicBreadcrumbs() {
  const routerState = useRouterState();
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

  React.useEffect(() => {
    const path = routerState.location.pathname;
    const pathSegments = path.split("/").filter((segment) => segment !== "");

    const breadcrumbItems = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      const isCurrentPage = index === pathSegments.length - 1;

      return {
        label,
        path,
        isCurrentPage,
      };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [routerState.location.pathname]);

  if (!breadcrumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((item) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isCurrentPage && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
