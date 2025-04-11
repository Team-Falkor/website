import { constants } from "@/utils";
import { useEffect, useRef, useState } from "react";

// Debounce function to limit the rate of triggering
const debounce = (fn: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
};

// Function to parse banner_message and convert **<string>** and *<string>* into bold and italic elements
const parseFormattedMessage = (message: string) => {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(message)) !== null) {
    const beforeMatch = message.slice(lastIndex, match.index);
    if (beforeMatch) parts.push(beforeMatch);

    if (match[2]) {
      // Bold text
      parts.push(<b key={match.index}>{match[2]}</b>);
    } else if (match[3]) {
      // Italic text
      parts.push(<i key={match.index}>{match[3]}</i>);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = message.slice(lastIndex);
  if (afterMatch) parts.push(afterMatch);

  return parts;
};

const MessageBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { banner_message } = constants;

  useEffect(() => {
    const message = localStorage.getItem("message-banner");

    if (message === banner_message) return setShowBanner(false);

    setShowBanner(!!banner_message);
    if (banner_message) localStorage.setItem("message-banner", banner_message);
  }, [banner_message]);

  useEffect(() => {
    const checkOverflow = () => {
      const bannerEl = bannerRef.current;
      if (bannerEl) {
        const isTextOverflowing = bannerEl.scrollWidth > bannerEl.clientWidth;
        setIsOverflowing(isTextOverflowing);
      }
    };

    // Debounced resize handler
    const debouncedCheckOverflow = debounce(checkOverflow, 150);

    checkOverflow();

    // Re-check on window resize with debounced function
    window.addEventListener("resize", debouncedCheckOverflow);
    return () => window.removeEventListener("resize", debouncedCheckOverflow);
  }, [banner_message]);

  if (!showBanner) return null;

  return (
    <div className="relative w-full bg-purple-800/25 flex justify-center items-center p-1 py-2 sm:py-3 text-sm sm:text-base overflow-hidden z-50">
      <div
        ref={bannerRef}
        className={`whitespace-nowrap ${isOverflowing ? "animate-marquee" : ""}`}
        style={{ maxWidth: "100%" }}
      >
        {parseFormattedMessage(banner_message)}
      </div>
    </div>
  );
};

export default MessageBanner;
