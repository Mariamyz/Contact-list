import "./DeleteModal.scss";

export default function DeleteModal({ contact, onCancel, onConfirm }) {
  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal">
        <h4>Confirm Deletion</h4>
        <p>
          Are you sure you want to delete{" "}
          <b>
            {contact.firstName} {contact.lastName}
          </b>
          ?
        </p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={() => onConfirm(contact.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
