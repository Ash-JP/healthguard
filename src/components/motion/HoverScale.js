'use client';

import { motion } from 'framer-motion';

export default function HoverScale({ children, scale = 1.02, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
