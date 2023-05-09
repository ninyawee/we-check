import { motion, AnimatePresence } from "framer-motion";
import React, { FC } from "react";

const AnimatedDrawer: FC<{
  keyTitle: string;
  keyId: any;
  children: React.ReactNode;
}> = ({ keyTitle, keyId, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${keyTitle}_${keyId}`}
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        exit={{ height: 0 }}
        transition={{
          type: "keyframes",
          duration: 0.19,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedDrawer;
