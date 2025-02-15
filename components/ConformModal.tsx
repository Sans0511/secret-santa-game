import React from "react";

interface conformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConform: () => void;
  message: string;
}

export const ConformModal: React.FC<conformModalProps> = ({
  isOpen,
  onClose,
  onConform,
  message,
}) => {
  if (!isOpen) return null;
  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-active btn-neutral btn-sm"
              onClick={onConform}
            >
              Conform
            </button>
            <button
              className="btn btn-active btn-neutral btn-sm ml-4"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
