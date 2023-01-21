import { HTMLMotionProps, motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import Icon from '../common/Icon';

interface ControlButtonProps extends HTMLMotionProps<'button'> {
  className?: string;
  icon: IconType;
}

export default function ControlButton({
  className,
  icon,
  ...rest
}: ControlButtonProps) {
  return (
    <motion.button
      className={className}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      exit={{ scale: 0 }}
      {...rest}
    >
      <Icon className='drop-shadow-lg text-slate-300' icon={icon} />
    </motion.button>
  );
}
