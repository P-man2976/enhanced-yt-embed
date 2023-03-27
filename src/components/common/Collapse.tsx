import { motion, AnimatePresence, MotionProps, HTMLMotionProps } from 'framer-motion';

export default function Collapse({
  isOpen,
  style,
  ...rest
}: { isOpen: boolean } & HTMLMotionProps<'div'>) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          {...rest}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{
            overflow: 'hidden',
            display: 'block',
            ...style,
          }}
        />
      )}
    </AnimatePresence>
  );
}
