import './Sidebar.scss';


export default function Sidebar({stor}) {

    const totalContacts = stor.length
  
    const statusCounts = {
      work: 0,
      family: 0,
      private: 0,
      friends: 0,
      others: 0
    }
  
    stor.forEach(contact => {
      statusCounts[contact.status] +=1
    });
  
    console.log(statusCounts);
    
  
    return(
      <aside className="sidebar-container">
      <div className="contacts-labels">
        <div className="sidebar-header">
          <span>All contacts:</span>
          <span>{totalContacts}</span>
        </div>
    
        <div className="contact-status-list">
          <div className="contact-status-item">
            <span className="status-badge status-work">Work</span>
            <span>{statusCounts.work}</span>
          </div>
    
          <div className="contact-status-item">
            <span className="status-badge status-family">Family</span>
            <span>{statusCounts.family}</span>
          </div>
    
          <div className="contact-status-item">
            <span className="status-badge status-friends">Friends</span>
            <span>{statusCounts.friends}</span>
          </div>
    
          <div className="contact-status-item">
            <span className="status-badge status-private">Private</span>
            <span>{statusCounts.private}</span>
          </div>
    
          <div className="contact-status-item">
            <span className="status-badge status-others">Others</span>
            <span>{statusCounts.others}</span>
          </div>
        </div>
      </div>
    </aside>
    
    )
  }