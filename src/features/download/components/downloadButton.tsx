import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
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
  href?: string | null;
}

export const DownloadButton = ({
  variant,
  label,
  icon,
  href,
  onClick,
}: DownloadButtonProps) => {
  return (
    <a
      className={cn(
        buttonVariants({
          variant,
          size: "lg",
        }),
        "h-14 text-lg flex items-center gap-3 transition-all transform hover:scale-105 focus-visible:scale-105"
      )}
      onClick={onClick}
      href={href ?? undefined}
    >
      {icon || <DownloadIcon className="w-5 h-5" />}
      {label}
    </a>
  );
};
