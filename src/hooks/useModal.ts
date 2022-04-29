import { useCallback, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresent = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return [isOpen, handlePresent, handleDismiss];
};

export default useModal;
