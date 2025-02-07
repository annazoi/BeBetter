import { FC } from "react";
import {
  Button,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  Modal as SemanticModal,
  Image,
} from "semantic-ui-react";

interface ModalProps {
  image?: string;
  name?: string;
  onOpen: boolean;
  onClose?: () => void;
  children: any;
  onSave?: () => void;
}

const Modal: FC<ModalProps> = ({
  onOpen,
  onClose,
  children,
  image,
  name,
  onSave,
}) => {
  return (
    <SemanticModal open={onOpen} onClose={onClose}>
      <ModalHeader>{name}</ModalHeader>

      <ModalContent image>
        {image && <Image src={image} size="small" wrapped />}
        <ModalDescription padded>{children}</ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} content="Close"></Button>
        {onSave && (
          <Button color="olive" onClick={onSave}>
            update
          </Button>
        )}
      </ModalActions>
    </SemanticModal>
  );
};

export default Modal;
