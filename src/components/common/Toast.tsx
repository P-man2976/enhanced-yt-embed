import { toastTextAtom, toastVisibilityAtom } from '@/atoms/toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { TbCheck } from 'react-icons/tb';
import Icon from './Icon';

export default function Toast() {
  const isVisible = useAtomValue(toastVisibilityAtom);
  const text = useAtomValue(toastTextAtom);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed flex justify-center md:justify-end items-center gap-4 top-0 w-full px-6 py-4 md:py-2 shadow-lg md:rounded-md z-50 bg-white/10 md:top-8 md:w-auto md:right-8"
        >
          <Icon icon={TbCheck} className="w-4 h-4 text-green-500 md:justify-self-start" />
          <p className="font-bold text-lg">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
