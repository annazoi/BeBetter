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
  isLoading?: boolean;
  color?: string;
  saveButtonText?: string;
  saveButtonColor?: any;
}

const Modal: FC<ModalProps> = ({
  onOpen,
  onClose,
  children,
  image,
  name,
  onSave,
  isLoading,
  color,
  saveButtonText = "update",
  saveButtonColor = "olive",
}) => {
  return (
    <SemanticModal open={onOpen} onClose={onClose}>
      <ModalHeader>{name}</ModalHeader>

      <ModalContent
        image
        style={{
          backgroundColor: color,
        }}
      >
        {image && <Image src={image} size="small" wrapped />}
        <ModalDescription>{children}</ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} content="Close"></Button>
        {onSave && (
          <Button color={saveButtonColor} onClick={onSave} loading={isLoading}>
            {saveButtonText}
          </Button>
        )}
      </ModalActions>
    </SemanticModal>
  );
};

export default Modal;
