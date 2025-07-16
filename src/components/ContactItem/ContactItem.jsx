import { BsPencilSquare, BsTrash, BsHeartFill, BsHeart } from 'react-icons/bs';
import { FiPhone, FiMail, FiTag } from 'react-icons/fi';
import { FaMale, FaFemale } from 'react-icons/fa';

import { toggleFavorite } from '../../redux/actions';
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
  const searchTerm = useSelector(state => state.search).toLowerCase();
  const filterStatus = useSelector(state => state.filterStatus);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm
      ? `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;
  
    const matchesStatus = filterStatus ? contact.status === filterStatus : true;
  
    return matchesSearch && matchesStatus;
  });
  

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
            className={`contact-avatar rounded-circle border ${contact.gender === 'men' ? 'border-primary' : 'border-danger'}`}
            src={`https://randomuser.me/api/portraits/${contact.gender === 'men' ? 'men' : 'women'}/${contact.avatar}.jpg`}
            alt={`${contact.firstName} ${contact.lastName}`}
           />

            <div className="contact-info">
              <h3 className="contact-name">
                {contact.firstName} {contact.lastName}
              </h3>
              <p><FiPhone /> {contact.phone}</p>
              <p><FiMail /> {contact.email}</p>
              <p>
                <FiTag />{' '}
                <span className={`status-badge status-${contact.status}`}>
                  {contact.status.toUpperCase()}
                </span>
              </p>
              <p>
                {contact.gender === 'men' ? (
                  <FaMale color="#2e7d32" size={20} />
                ) : (
                  <FaFemale color="#d81b60" size={20} />
                )}{' '}
                <b>{contact.gender.toUpperCase()}</b>
              </p>
              <p
                onClick={(e) => {
                 e.stopPropagation();
                   dispatch(toggleFavorite(contact.id));
                }}
                style={{ cursor: 'pointer' }}
>
                  Favorite: {contact.favorite ? <BsHeartFill color="red" /> : <BsHeart />}
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
