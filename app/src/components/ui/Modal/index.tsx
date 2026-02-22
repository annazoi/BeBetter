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
}) => {
  return (
    <SemanticModal open={onOpen} onClose={onClose}>
      <ModalHeader>{name}</ModalHeader>

      <ModalContent
        image
        style={{
          backgroundColor: color,
          borderRadius: "20px",
        }}
      >
        {image && <Image src={image} size="small" wrapped />}
        <ModalDescription padded>{children}</ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} content="Close"></Button>
        {onSave && (
          <Button color="olive" onClick={onSave} loading={isLoading}>
            update
          </Button>
        )}
      </ModalActions>
    </SemanticModal>
  );
};

export default Modal;
