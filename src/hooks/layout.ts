import { useCallback, useState } from 'react';

export const useBoolean = ({ initial }: { initial?: boolean } = {}) => {
  const [isOpen, setIsOpen] = useState(!!initial);

  const onToggle = useCallback(() => {
    setIsOpen((currVal) => !currVal);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onToggle, onOpen, onClose };
};
