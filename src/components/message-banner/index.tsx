import { constants } from "@/utils";
import { useEffect, useState } from "react";

const MessageBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { banner_message } = constants;

  useEffect(() => {
    const message = localStorage.getItem("message-banner");

    if (message === banner_message) return setShowBanner(false);

    setShowBanner(!!banner_message);
    if (banner_message) localStorage.setItem("message-banner", banner_message);
  }, [banner_message]);

  if (!showBanner) return null;

  return (
    <div className="absolute top-0 right-0 left-0 w-full h-8 bg-purple-800/25 flex justify-center items-center text-white text-sm line-clamp-1 p-2 sm:text-lg">
      {banner_message}
    </div>
  );
};

export default MessageBanner;
