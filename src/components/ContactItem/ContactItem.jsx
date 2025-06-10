import { BsPencilSquare, BsTrash, BsHeartFill, BsHeart } from 'react-icons/bs';
import { FiPhone, FiMail, FiTag } from 'react-icons/fi';
import { FaMale, FaFemale } from 'react-icons/fa';
import './ContactItem.scss';
import { useNavigate } from 'react-router-dom';


export default function ContactItem({ stor, deleteContact }) {
  const navigate = useNavigate();

  return (
    <div className="contact-list-grid">
      {stor.map(contact => (
        <div key={contact.id} className="contact-card">
          <img
            className="contact-avatar"
            src={`https://randomuser.me/api/portraits/${contact.gender.toLowerCase()}/${contact.avatar}.jpg`}
            alt={`${contact.firstName} ${contact.lastName}`}
          />
          <div className="contact-info">
            <h3 className="contact-name">
              {contact.firstName} {contact.lastName}
            </h3>

            <p>
              <FiPhone style={{ marginRight: '6px' }} />
              {contact.phone}
            </p>

            <p>
              <FiMail style={{ marginRight: '6px' }} />
              {contact.email}
            </p>

            <p>
              <FiTag style={{ marginRight: '6px' }} />
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
              {contact.favorite ? (
                <BsHeartFill color="red" />
              ) : (
                <BsHeart />
              )}
            </p>
          </div>

          <div className="contact-actions">
          <button
               className="edit-btn"
               onClick={() => navigate(`/update-contact/${contact.id}`)
              }
               >
              <BsPencilSquare /> Edit
          </button>

            <button
              className="delete-btn"
              onClick={() => deleteContact(contact.id)}
            >
              <BsTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
