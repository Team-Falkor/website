/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DiscordIndexImport } from './routes/discord/index'
import { Route as GithubNameImport } from './routes/github/$name'
import { Route as DiscordFlwImport } from './routes/discord/flw'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DiscordIndexRoute = DiscordIndexImport.update({
  path: '/discord/',
  getParentRoute: () => rootRoute,
} as any)

const GithubNameRoute = GithubNameImport.update({
  path: '/github/$name',
  getParentRoute: () => rootRoute,
} as any)

const DiscordFlwRoute = DiscordFlwImport.update({
  path: '/discord/flw',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/discord/flw': {
      id: '/discord/flw'
      path: '/discord/flw'
      fullPath: '/discord/flw'
      preLoaderRoute: typeof DiscordFlwImport
      parentRoute: typeof rootRoute
    }
    '/github/$name': {
      id: '/github/$name'
      path: '/github/$name'
      fullPath: '/github/$name'
      preLoaderRoute: typeof GithubNameImport
      parentRoute: typeof rootRoute
    }
    '/discord/': {
      id: '/discord/'
      path: '/discord'
      fullPath: '/discord'
      preLoaderRoute: typeof DiscordIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/discord/flw': typeof DiscordFlwRoute
  '/github/$name': typeof GithubNameRoute
  '/discord': typeof DiscordIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/discord/flw': typeof DiscordFlwRoute
  '/github/$name': typeof GithubNameRoute
  '/discord': typeof DiscordIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/discord/flw': typeof DiscordFlwRoute
  '/github/$name': typeof GithubNameRoute
  '/discord/': typeof DiscordIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/discord/flw' | '/github/$name' | '/discord'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/discord/flw' | '/github/$name' | '/discord'
  id: '__root__' | '/' | '/discord/flw' | '/github/$name' | '/discord/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  DiscordFlwRoute: typeof DiscordFlwRoute
  GithubNameRoute: typeof GithubNameRoute
  DiscordIndexRoute: typeof DiscordIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  DiscordFlwRoute: DiscordFlwRoute,
  GithubNameRoute: GithubNameRoute,
  DiscordIndexRoute: DiscordIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/discord/flw",
        "/github/$name",
        "/discord/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/discord/flw": {
      "filePath": "discord/flw.tsx"
    },
    "/github/$name": {
      "filePath": "github/$name.tsx"
    },
    "/discord/": {
      "filePath": "discord/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
