import { GitHubLoginButton } from "./main/github-login-button";
import { ModalContent } from "./main/modal-content";
import { ModalHeader } from "./main/modal-header";

interface InModalContentProps {
  modalCloseFunc: () => void;
  redirectPath: string;
}

export function MainInModalContent({
  modalCloseFunc,
  redirectPath,
}: InModalContentProps) {
  return (
    <>
      <ModalHeader modalCloseFunc={modalCloseFunc} />
      <ModalContent />
      <hr className="h-2 mt-2" />
      <GitHubLoginButton redirectPath={redirectPath} />
    </>
  );
}
