import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import closeIcon from '../../assets/general/close-icon.svg'

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

// const modalRoot = document.getElementById("modal-root")!;

export function Modal({ children, onClose }: ModalProps) {

  const modalRoot = document.getElementById("modal-root")!;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function onClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-background" onClick={onClickOutside} data-testid="modal-test">
      <div className="form">
        <button data-testid="modal-close-test" onClick={onClose} className="form__close close-btn">
            <img src={closeIcon} alt="close icon" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}