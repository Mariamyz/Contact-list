import './Sidebar.scss';
import { useSelector } from 'react-redux';

export default function Sidebar({ stor }) {
  const contactStatuss = useSelector(state => state.contactStatuss);

  const dynamicStatusCounts = { ...Object.keys(contactStatuss).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {}) };


  stor.forEach(contact => {
    if (dynamicStatusCounts.hasOwnProperty(contact.status)) {
      dynamicStatusCounts[contact.status]++;
    }
  });

  const totalContacts = stor.length;

  return (
    <aside className="sidebar-container">
      <div className="contacts-labels">
        <div className="sidebar-header">
          <span>All contacts:</span>
          <span>{totalContacts}</span>
        </div>

        <div className="contact-status-list">
          {Object.entries(dynamicStatusCounts).map(([status, count]) => (
            <div className="contact-status-item" key={status}>
              <span className={`status-badge status-${status}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
