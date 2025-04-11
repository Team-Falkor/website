import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GithubIcon, MessageCircleIcon } from "lucide-react";

export const BugReportSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mt-10 max-w-3xl mx-auto bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-lg"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
      >
        Encountering Issues?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-lg text-gray-300 max-w-2xl"
      >
        If you experience any bugs or have suggestions, feel free to open an
        issue on our GitHub Issues page or join our Discord server.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 flex flex-wrap gap-4 justify-center"
      >
        <motion.a
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(79, 70, 229, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          href="https://github.com/Team-Falkor/app/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            className: "h-14 text-lg px-6 shadow-md",
            variant: "secondary",
            size: "lg",
          })}
        >
          <GithubIcon className="mr-2 h-5 w-5" />
          Report on GitHub
        </motion.a>
        <motion.a
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(79, 70, 229, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          href="https://falkor.moe/discord"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            className: "h-14 text-lg px-6 shadow-md",
            variant: "secondary",
            size: "lg",
          })}
        >
          <MessageCircleIcon className="mr-2 h-5 w-5" />
          Join Discord
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
