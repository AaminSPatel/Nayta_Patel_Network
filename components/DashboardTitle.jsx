import { motion } from "framer-motion";

export default function DashboardTitle({ title }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-3xl md:text-4xl font-bold"
    >
      {title}
    </motion.h1>
  );
}
