import React from "react";
import "./DeleteStatusModal.scss";

export default function DeleteStatusModal({
  isOpen,
  onClose,
  onConfirm,
  status,
}) {
  if (!isOpen) return null;

  return (
    <div className="delete-status-overlay">
      <div className="delete-status-modal">
        <h3>
          Confirm Deletion: <strong>{status}</strong>?
        </h3>
        <p>
          Are you sure you want to delete <strong>{status}</strong>?
        </p>
        <div className="delete-status-buttons">
          <button className="delete-status-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="delete-status-confirm"
            onClick={() => onConfirm(status)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
