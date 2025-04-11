import { Version } from "@/@types";
import Footer from "@/components/footer";
import SvgBG from "@/components/svgBG";
import {
  BugReportSection,
  DownloadSection,
} from "@/features/download/components";
import { constants, downloadApp } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/download/")({
  component: Download,
});

function Download() {
  const version = constants.app_version as Version;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="relative p-2 px-4 pb-16 overflow-hidden">
        <SvgBG />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="px-4 pt-8 pb-6 mx-auto max-w-4xl sm:px-6 sm:pt-10 sm:pb-8"
        >
          <div className="text-center">
            <motion.h1
              variants={itemVariants}
              className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Downloads
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg lg:text-xl"
            >
              Falkor is available for Windows and Linux.
              <br />
              For the best experience, please use the latest version available.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="px-4 pt-12 mx-auto max-w-4xl sm:px-6 lg:max-w-6xl lg:pt-16 space-y-16"
        >
          {/* LINUX DOWNLOAD SECTION */}
          <motion.div
            variants={itemVariants}
            className="transform hover:scale-[1.01] transition-all duration-300"
          >
            <DownloadSection
              platform="linux"
              version={version}
              imgSrc="/linux.png"
              buttons={[
                {
                  label: "AppImage",
                  variant: "secondary",
                  href: downloadApp("appimage", version),
                },
                {
                  label: "Debian",
                  variant: "secondary",
                  href: downloadApp("debian", version),
                },
                {
                  label: "Tar.gz",
                  variant: "secondary",
                  href: downloadApp("tar.gz", version),
                },
                {
                  label: "Pacman",
                  variant: "secondary",
                  href: downloadApp("pacman", version),
                },
                {
                  label: "RPM",
                  variant: "secondary",
                  href: downloadApp("rpm", version),
                },
              ]}
            />
          </motion.div>

          {/* WINDOWS DOWNLOAD SECTION */}
          <motion.div
            variants={itemVariants}
            className="transform hover:scale-[1.01] transition-all duration-300"
          >
            <DownloadSection
              platform="windows"
              version={version}
              imgSrc="/windows.png"
              buttons={[
                {
                  label: "Download for Windows",
                  variant: "secondary",
                  href: downloadApp("windows", version),
                },
              ]}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-16"
        >
          <BugReportSection />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
