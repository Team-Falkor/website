import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { motion } from "framer-motion";
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
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        buttonVariants({
          variant,
          size: "lg",
        }),
        "h-14 text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-xl focus-visible:shadow-xl backdrop-blur-sm"
      )}
      onClick={onClick}
      href={href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 1, repeat: 0 }}
      >
        {icon || <DownloadIcon className="w-5 h-5" />}
      </motion.span>
      {label}
    </motion.a>
  );
};
