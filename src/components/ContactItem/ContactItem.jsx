import { BsPencilSquare, BsTrash, BsHeartFill, BsHeart } from 'react-icons/bs';
import { FiPhone, FiMail, FiTag } from 'react-icons/fi';
import { FaMale, FaFemale } from 'react-icons/fa';
import './ContactItem.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../DeleteModal/DeleteModal';
import ContactDetailsModal from '../../pages/ContactDetailsModal/ContactDetailsModal';
import { deleteContact } from '../../redux/actions';

export default function ContactItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector(state => state.contacts);
  const searchTerm = useSelector(state => state.search);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = searchTerm
    ? contacts.filter(contact =>
        contact.firstName.toLowerCase().startsWith(searchTerm) ||
        contact.lastName.toLowerCase().startsWith(searchTerm)
      )
    : contacts;

  return (
    <>
      <div className="contact-list-grid">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className="contact-card"
            onClick={() => {
              setSelectedContact(contact);
              setDetailsVisible(true);
            }}
          >
            <img
              className="contact-avatar"
              src={`https://randomuser.me/api/portraits/${contact.gender.toLowerCase()}/${contact.avatar}.jpg`}
              alt={`${contact.firstName} ${contact.lastName}`}
            />
            <div className="contact-info">
              <h3 className="contact-name">
                {contact.firstName} {contact.lastName}
              </h3>
              <p><FiPhone style={{ marginRight: '6px' }} />{contact.phone}</p>
              <p><FiMail style={{ marginRight: '6px' }} />{contact.email}</p>
              <p><FiTag style={{ marginRight: '6px' }} />
                <span className={`status-badge status-${contact.status}`}>
                  {contact.status.toUpperCase()}
                </span>
              </p>
              <p>
                {contact.gender.toLowerCase() === 'men' ? (
                  <FaMale color="#2e7d32" size={20} style={{ marginRight: '6px' }} />
                ) : (
                  <FaFemale color="#d81b60" size={20} style={{ marginRight: '6px' }} />
                )}
                <b>{contact.gender.toUpperCase()}</b>
              </p>
              <p>
                Favorite:{' '}
                {contact.favorite ? <BsHeartFill color="red" /> : <BsHeart />}
              </p>
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
    </>
  );
}
