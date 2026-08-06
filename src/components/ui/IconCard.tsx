import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeInUp, viewportOnce, staggeredTransition } from '../../lib/motion';

interface IconCardProps {
  icon: ReactNode;
  iconClassName?: string;
  title: string;
  description: string;
  index?: number;
}

export default function IconCard({
  icon,
  iconClassName = 'bg-primary/10 text-primary',
  title,
  description,
  index = 0,
}: IconCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={staggeredTransition(index)}
      className="card-surface p-7"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${iconClassName}`}>
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-dark mb-2.5">{title}</h3>
      <p className="text-sm text-dark/60 leading-relaxed">{description}</p>
    </motion.div>
  );
}
