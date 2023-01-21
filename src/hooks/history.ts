import { historyAtom, internalHistoryAtom } from '@/atoms/player';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useHistory = () => {
  const [history, setHistory] = useAtom(historyAtom);
  const [internalHistory, setInternalHistory] = useAtom(internalHistoryAtom);

  const add = useCallback(
    (queue?: Queue[], addToInternal?: boolean) => {
      const historyQueue = queue?.flatMap((video) => video ?? []) ?? [];
      setHistory((current) => [...current, ...historyQueue]);
      if (addToInternal)
        setInternalHistory((current) => [...current, ...historyQueue]);
    },
    [setHistory, setInternalHistory]
  );

  const remove = useCallback(
    (id: string) => {
      setHistory((current) => current.filter((queue) => queue.id !== id));
    },
    [setHistory]
  );

  const removeAll = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return { history, internalHistory, add, remove, removeAll };
};
