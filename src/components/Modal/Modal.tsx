import { useEffect } from 'react';
import css from './Modal.module.css'
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") ?? document.body;

export default function Modal({ children, onClose }: Props) {
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
