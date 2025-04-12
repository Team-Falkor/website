import FaQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import HeroComponent from "@/components/hero";
import QuickInfo from "@/components/quickinfo";
import SvgBG from "@/components/svgBG";
import { createLazyFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
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
      <SvgBG />
      <div className="relative p-2 px-4 pb-16 overflow-hidden pt-16 sm:pt-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <HeroComponent />
          </motion.div>

          <motion.div variants={itemVariants}>
            <QuickInfo />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FaQ />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Features />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
