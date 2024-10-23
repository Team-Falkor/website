import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export interface DownloadButtonProps {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

export const DownloadButton = ({
  variant,
  label,
  icon,
  onClick,
}: DownloadButtonProps) => {
  return (
    <Button
      variant={variant}
      size="lg"
      className="h-14 text-lg flex items-center gap-3 transition-all transform hover:scale-105 hover:shadow-lg focus-visible:scale-105 focus-visible:shadow-lg"
      onClick={onClick}
    >
      {icon || <DownloadIcon className="w-5 h-5" />}
      {label}
    </Button>
  );
};
