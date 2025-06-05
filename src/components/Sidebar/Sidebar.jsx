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
        <aside className="container border-end">
          <div className="row">
            <div className="col-12">
              <div className="contacts-labels">
                <div className="fs-3 mb-5 mt-4 d-flex justify-content-between">
                  <span>All contacts:</span><span>{totalContacts}</span>
                </div>
                <div className="list fs-5">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-success">Work</div>
                    <span>{statusCounts.work}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-warning">Family</div>
                    <span>{statusCounts.family}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-info">Friends</div>
                    <span>{statusCounts.friends}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-primary">Private</div>
                    <span>{statusCounts.private}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-secondary">Others</div>
                    <span>{statusCounts.others}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
    )
  }