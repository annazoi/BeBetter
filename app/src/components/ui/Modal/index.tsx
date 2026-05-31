import { FC, ReactNode, cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "semantic-ui-react";
import { X } from "lucide-react";
import "./style.css";

const MODAL_CLOSE_MS = 420;

interface ModalProps {
  onOpen: boolean;
  onClose?: () => void;
  children: any;
  name?: string;
  header?: ReactNode;
  footer?: ReactNode;
  image?: string;
  onSave?: () => void;
  isLoading?: boolean;
  color?: string;
  saveButtonText?: string;
  saveButtonColor?: any;
  size?: "mini" | "tiny" | "small" | "large";
  closeIcon?: boolean;
  trigger?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  onOpen,
  onClose,
  children,
  name,
  header,
  footer,
  image,
  onSave,
  isLoading,
  color,
  saveButtonText = "Save",
  saveButtonColor = "olive",
  size,
  closeIcon = true,
  trigger,
}) => {
  const prevOpenRef = useRef(onOpen);
  const [isClosing, setIsClosing] = useState(false);

  const isClosingAnim = !onOpen && (isClosing || prevOpenRef.current);
  const isVisible = onOpen || isClosingAnim;
  const isOpeningAnim = onOpen && !isClosingAnim;

  useLayoutEffect(() => {
    if (onOpen) {
      setIsClosing(false);
    } else if (prevOpenRef.current) {
      setIsClosing(true);
    }
    prevOpenRef.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    if (!isClosing) return;
    const timer = window.setTimeout(() => setIsClosing(false), MODAL_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [isClosing]);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!onOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onOpen, isClosing]);

  const requestClose = () => {
    if (!onOpen || isClosingAnim) return;
    onClose?.();
  };

  const triggerElement = trigger && isValidElement(trigger)
    ? cloneElement(trigger as React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>, {
        onClick: (event: React.MouseEvent) => {
          (trigger as React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>).props.onClick?.(event);
        },
      })
    : trigger;

  const showHeader = Boolean(header || name);
  const showDefaultActions = !footer && Boolean(onSave);

  const modalContent = isVisible ? (
    <div
      className={`habitry-modal-portal ${isOpeningAnim ? "habitry-modal-portal--open" : ""} ${isClosingAnim ? "habitry-modal-portal--closing" : ""}`}
      role="presentation"
    >
      <button
        type="button"
        className="habitry-modal-backdrop"
        onClick={requestClose}
        aria-label="Close dialog"
        tabIndex={-1}
      />

      <div
        className={`habitry-modal habitry-modal--${size || "default"}`}
        role="dialog"
        aria-modal="true"
        aria-label={name}
      >
        {closeIcon && (
          <button type="button" className="habitry-modal__close" onClick={requestClose} aria-label="Close">
            <X size={18} />
          </button>
        )}

        {showHeader && (
          <div className="habitry-modal__header">
            {header || <h2 className="habitry-modal__title font-display">{name}</h2>}
          </div>
        )}

        <div className="habitry-modal__content" style={color ? { backgroundColor: color } : undefined}>
          {image && (
            <div className="habitry-modal__image">
              <img src={image} alt="" />
            </div>
          )}
          <div className="habitry-modal__body">{children}</div>
        </div>

        {footer ? (
          <div className="habitry-modal__actions">{footer}</div>
        ) : showDefaultActions ? (
          <div className="habitry-modal__actions">
            <Button onClick={requestClose} basic className="btn-ghost">
              Close
            </Button>
            {onSave && (
              <Button
                color={saveButtonColor}
                onClick={onSave}
                loading={isLoading}
                className={saveButtonColor === "red" ? "" : "btn-primary"}
              >
                {saveButtonText}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  ) : null;

  return (
    <>
      {triggerElement}
      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default Modal;
