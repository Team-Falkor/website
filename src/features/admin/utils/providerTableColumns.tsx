import { Button } from "@/components/ui/button";
import { providersAdminApi } from "@/features/providers/utils/api/providersAdminApi";
import { ColumnDef } from "@tanstack/react-table";
import { PluginProvider } from "@team-falkor/shared-types";

export const providerColumns: ColumnDef<PluginProvider>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "setupUrl",
    header: "Setup URL",
  },
  {
    accessorKey: "setupJSON",
    header: "Setup JSON",
    cell: ({ row }) => {
      const setupJSON = row.original.setupJSON;
      return (
        <p className="line-clamp-1 max-w-52">{JSON.stringify(setupJSON)}</p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          onClick={() => providersAdminApi.approveProvider(row.original.id)}
        >
          Approve
        </Button>
        <Button
          onClick={() => providersAdminApi.deleteProvider(row.original.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
