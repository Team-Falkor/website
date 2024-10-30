import { buttonVariants } from "@/components/ui/button";

export const BugReportSection = () => {
  return (
    <div className="flex flex-col items-center text-center mt-10 text-orange-400">
      <h2 className="text-2xl font-bold">Encountering Issues? 👻</h2>
      <p className="mt-4 text-lg text-gray-300">
        If you experience any bugs or have suggestions, feel free to open an
        issue on our GitHub Issues page or join our Discord server.
      </p>
      <div className="mt-6">
        <a
          href="https://github.com/Team-Falkor/app/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            className: "h-14 text-lg mr-3",
            variant: "secondary",
            size: "lg",
          })}
        >
          Report on GitHub 🎃
        </a>
        <a
          href="https://falkor.moe/discord"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            className: "h-14 text-lg mr-3",
            variant: "secondary",
            size: "lg",
          })}
        >
          Join Discord 🕸️
        </a>
      </div>
    </div>
  );
};
