import { toastTextAtom, toastVisibilityAtom } from '@/atoms/toast';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const useToast = () => {
  const setToastText = useSetAtom(toastTextAtom);
	const setToastVisible = useSetAtom(toastVisibilityAtom);

  const toast = useCallback(
    ({ text, duration }: { text: string; duration?: number }) => {
      setToastText(text);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), duration ?? 1000);
    },
    []
  );

  return toast;
};
