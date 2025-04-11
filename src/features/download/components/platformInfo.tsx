// platformInfo.tsx
import { motion } from "framer-motion";

interface PlatformInfoProps {
  platform: string;
  version: string;
  imgSrc: string;
}

export const PlatformInfo = ({
  platform,
  version,
  imgSrc,
}: PlatformInfoProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 border-b border-gray-700/50 pb-5 items-center overflow-hidden p-6 bg-gradient-to-r from-gray-800/40 to-gray-800/20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-700/30 p-3 rounded-full shadow-inner flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={`${platform} logo`}
          className="aspect-square size-14 sm:size-16 object-contain drop-shadow-lg"
        />
      </motion.div>
      <div className="flex flex-col items-center sm:items-start">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
        >
          {`${version} Falkor`}
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 capitalize"
        >
          {`for ${platform}`}
        </motion.p>
      </div>
    </div>
  );
};
