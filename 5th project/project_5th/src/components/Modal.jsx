import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="fixed left-1/2 top-1/2 z-50 min-h-[200px] min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={onClose}
            className="cursor-pointer text-2xl"
          />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
