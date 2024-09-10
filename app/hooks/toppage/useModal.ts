import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsOpen] = useState<boolean>(false);
  const modalOpen = () => setIsOpen(true);
  const modalClose = () => setIsOpen(false);

  return { isModalOpen, modalOpen, modalClose };
};
