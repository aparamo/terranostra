'use client';

import {motion} from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({title, subtitle}: SectionTitleProps) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.5}}
    >
      <h2 className="text-4xl font-bold text-primary">{title}</h2>
      <p className="text-lg text-muted-foreground mt-4">{subtitle}</p>
    </motion.div>
  );
}
