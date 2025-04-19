import { buttonVariants } from "@/components/ui/button";
import { useTrackEvent } from "@/features/analytics/hooks/useTrackEvent";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import { useRef } from "react";

export interface DownloadButtonProps {
  variant?:
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
  onClick,
  href,
}: DownloadButtonProps) => {
  const trackEvent = useTrackEvent();
  const hasClicked = useRef(false);

  const handleClick = () => {
    if (onClick) onClick();

    // Prevent duplicate tracking
    if (hasClicked.current) return;
    hasClicked.current = true;

    trackEvent<{
      label: string;
      href?: string;
    }>({
      eventType: "download",
      context: {
        label,
        ...(href ? { href } : {}),
      },
    });

    // Reset after short delay if needed
    setTimeout(() => {
      hasClicked.current = false;
    }, 1000);
  };

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
      onClick={handleClick}
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
