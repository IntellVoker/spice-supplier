import type { Variants, Transition } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const viewportOnce = { once: true, margin: '-50px' } as const;

export const defaultTransition: Transition = { duration: 0.5 };

export const staggeredTransition = (delay: number): Transition => ({
  duration: 0.5,
  delay: delay * 0.08,
});
