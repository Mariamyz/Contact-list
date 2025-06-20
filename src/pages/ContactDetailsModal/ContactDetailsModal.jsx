import './ContactDetailsModal.scss';

export default function ContactDetailsModal({ contact, onClose }) {
  return (
    <div className="details-backdrop">
      <div className="details-modal">
        <button className="details-close" onClick={onClose}>×</button>
        <h2 className="details-title">Contact information</h2>
        <img
          src={`https://randomuser.me/api/portraits/${contact.gender.toLowerCase()}/${contact.avatar}.jpg`}
          alt={contact.firstName}
          className="details-avatar"
        />
        <h3 className="details-name">{contact.firstName} {contact.lastName}</h3>
        <p><b>Email:</b> {contact.email}</p>
        <p><b>Phone:</b> {contact.phone}</p>
        <p><b>Status:</b> {contact.status}</p>
        <p><b>Gender:</b> {contact.gender}</p>
        <p><b>Favorite:</b> {contact.favorite ? 'Yes' : 'No'}</p>
        <button className="details-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
