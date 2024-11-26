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
          className="fixed top-0 z-50 flex w-full items-center justify-center gap-4 bg-white/10 px-6 py-4 shadow-lg md:right-8 md:top-8 md:w-auto md:justify-end md:rounded-md md:py-2"
        >
          <Icon icon={TbCheck} className="h-4 w-4 text-green-500 md:justify-self-start" />
          <p className="text-lg font-bold">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
