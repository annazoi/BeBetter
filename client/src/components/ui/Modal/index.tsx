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
  onClose: () => void;
  children: any;
}

const Modal: FC<ModalProps> = ({ onOpen, onClose, children, image, name }) => {
  return (
    <SemanticModal open={onOpen} onClose={onClose}>
      <ModalHeader>{name}</ModalHeader>

      <ModalContent image>
        {image && <Image src={image} size="small" wrapped />}
        <ModalDescription padded>{children}</ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} content="cancel"></Button>
        <Button color="olive">update</Button>
      </ModalActions>
    </SemanticModal>
  );
};

export default Modal;
