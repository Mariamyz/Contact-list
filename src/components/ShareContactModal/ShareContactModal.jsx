import { FaViber, FaTelegramPlane, FaEnvelope, FaInstagram } from "react-icons/fa";
import "./ShareContactModal.scss";

export default function ShareContactModal({ isOpen, onClose, contact }) {
  if (!isOpen) return null;

  const openViber = () => {
    window.open(`viber://chat?number=${contact.phone}`, "_blank");
  };

  const openTelegram = () => {
    window.open(`https://t.me/${contact.username || ""}`, "_blank");
  };

  const openEmail = () => {
    window.open(`mailto:${contact.email}`, "_blank");
  };

  const openInstagram = () => {
    window.open(`https://instagram.com/${contact.instagram || ""}`, "_blank");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Share contact</h3>
        <div className="share-icons">
          <FaViber size={30} className="share-icon viber" onClick={openViber} />
          <FaTelegramPlane size={30} className="share-icon telegram" onClick={openTelegram} />
          <FaEnvelope size={30} className="share-icon email" onClick={openEmail} />
          <FaInstagram size={30} className="share-icon instagram" onClick={openInstagram} />
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}
