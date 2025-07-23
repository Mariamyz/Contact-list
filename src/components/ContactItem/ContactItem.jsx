import { BsPencilSquare, BsTrash, BsHeartFill, BsHeart } from "react-icons/bs";
import { FiTag, FiPhoneCall } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
// import { FaMale, FaFemale } from "react-icons/fa";

import { toggleFavorite, deleteContact } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteModal from "../DeleteModal/DeleteModal";
import ContactDetailsModal from "../../pages/ContactDetailsModal/ContactDetailsModal";
import ShareContactModal from "../ShareContactModal/ShareContactModal";

import "./ContactItem.scss";

export default function ContactItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector((state) => state.contacts);
  const searchTerm = useSelector((state) => state.search).toLowerCase();
  const filterStatus = useSelector((state) => state.filterStatus);
  const contactStatuss = useSelector((state) => state.contactStatuss);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
        .toLowerCase()
        .includes(searchTerm);
    const matchesStatus = filterStatus ? contact.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="contact-list-grid">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-card"
            onClick={() => {
              setSelectedContact(contact);
              setDetailsVisible(true);
            }}
          >
            <div className="avatar-container">
              <img
                className={`contact-avatar rounded-circle border ${
                  contact.gender === "men" ? "border-primary" : "border-danger"
                }`}
                src={`https://randomuser.me/api/portraits/${
                  contact.gender === "men" ? "men" : "women"
                }/${contact.avatar}.jpg`}
                alt={`${contact.firstName} ${contact.lastName}`}
              />
              <span
                className="favorite-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(contact.id));
                }}
              >
                {contact.favorite ? (
                  <BsHeartFill color="red" size={20} />
                ) : (
                  <BsHeart size={20} />
                )}
              </span>
            </div>

            <div className="contact-info">
              <h3 className="contact-name">
                {contact.firstName} {contact.lastName}
              </h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>

              <p>
                <FiTag />{" "}
                <span
                  className={`status-badge status-${contact.status}`}
                  style={{
                    backgroundColor: contactStatuss[contact.status]?.bg,
                    color: contactStatuss[contact.status]?.color,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  {contact.status.toUpperCase()}
                </span>
              </p>

              <div className="contact-actions-top">
                <button
                  className="icon-btn phone-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`tel:${contact.phone}`, "_self");
                  }}
                >
                  <FiPhoneCall size={20} />
                </button>
                <button
                  className="icon-btn message-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Відкриваємо модалку для контакту:", contact);
                    setSelectedContact(contact);
                    setShareOpen(true);
                  }}
                >
                  <IoSend size={20} className="send-icon" />
                </button>
              </div>

              {/* 
              <p>
                {contact.gender === "men" ? (
                  <FaMale color="#2e7d32" size={20} />
                ) : (
                  <FaFemale color="#d81b60" size={20} />
                )}{" "}
                <b>{contact.gender.toUpperCase()}</b>
              </p>
              */}
            </div>

            <div className="contact-actions">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/update-contact/${contact.id}`);
                }}
              >
                <BsPencilSquare /> Edit
              </button>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedContact(contact);
                  setModalVisible(true);
                }}
              >
                <BsTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalVisible && selectedContact && (
        <DeleteModal
          contact={selectedContact}
          onCancel={() => {
            setModalVisible(false);
            setSelectedContact(null);
          }}
          onConfirm={(id) => {
            dispatch(deleteContact(id));
            setModalVisible(false);
            setSelectedContact(null);
          }}
        />
      )}

      {detailsVisible && selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => {
            setDetailsVisible(false);
            setSelectedContact(null);
          }}
        />
      )}

      {shareOpen && selectedContact && (
        <ShareContactModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          contact={selectedContact}
        />
      )}
    </>
  );
}
