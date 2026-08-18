import * as React from "react";
import { motion, useInView } from "framer-motion";

const Animate = ({ children, delay = 0, duration = 1.5, y = 75 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
