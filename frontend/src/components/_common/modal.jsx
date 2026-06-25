import s from "./modal.module.scss";
import { createPortal } from "react-dom";

export const Modal = ({ children, open, closeFunc }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (closeFunc) {
      console.log("closing modal");

      closeFunc();
    }
  }

  if (open) {
    return createPortal(
      <div className={s.modal} onClick={handleClick} >
        <div className={s.modalContent}>
          {children}
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  }

  return null;
}
