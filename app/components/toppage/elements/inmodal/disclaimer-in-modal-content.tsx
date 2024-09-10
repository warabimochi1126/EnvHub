import { AgreeButton } from "./disclaimer/agree-button";
import { ModalContent } from "./disclaimer/modal-content";
import { ModalHeader } from "./disclaimer/modal-header";

interface InModalContent {
  modalCloseFunc: () => void;
}

export function DisClaimerInModalContent({ modalCloseFunc }: InModalContent) {
  return (
    <>
      <ModalHeader />
      <ModalContent />
      <hr className="mt-2 h-2 mb-1" />
      <AgreeButton modalCloseFunc={modalCloseFunc} />
    </>
  );
}
