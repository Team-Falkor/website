import { Event } from "@/@types/events";

export const events: Array<Event> = [
  {
    phase: "launch",
    status: "in-progress",
    items: [
      {
        title: "In-app updater with changelog",
        completed: true,
      },
      {
        title: "Improved integrated download and torrent client",
        completed: false,
      },
      {
        title: "Import achievements",
        completed: false,
      },
      {
        title: "Save data manager",
        completed: false,
      },
      {
        title: "Extended debrid options: delete and renew key",
        completed: false,
      },
      {
        title:
          "Combine theme and genre into a single page called 'Filter', with filtering options",
        completed: false,
      },
      {
        title:
          "Plugin support for extending app functionality with community-made extensions",
        completed: false,
      },
    ],
  },
  {
    phase: "post-launch",
    status: "planned",
    items: [
      {
        title: "Premiumize support",
        completed: false,
      },
      {
        title:
          "Bind download/torrent client to VPN and add option to disable seeding",
        completed: false,
      },
      {
        title:
          "Social features such as friends, groups, messaging, and achievement sharing (always free)",
        completed: false,
      },
      {
        title: "Sync game saves to the cloud",
        completed: false,
      },
    ],
  },
  {
    phase: "future",
    status: "planned",
    items: [
      {
        title:
          "Auto-detect and import games (e.g., .exe) from a user-defined path and automatically add metadata",
        completed: false,
      },
      {
        title: "Add additional debrid service support",
        completed: false,
      },
      {
        title: "Add more metadata sources",
        completed: false,
      },
    ],
  },
];
