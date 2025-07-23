import "./Sidebar.scss";
import { useSelector, useDispatch } from "react-redux";
import { SET_FILTER } from "../../redux/type";

export default function Sidebar({ stor }) {
  const contactStatuss = useSelector((state) => state.contactStatuss);
  const filterStatus = useSelector((state) => state.filterStatus);
  const dispatch = useDispatch();

  const dynamicStatusCounts = Object.keys(contactStatuss).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  stor.forEach((contact) => {
    if (dynamicStatusCounts.hasOwnProperty(contact.status)) {
      dynamicStatusCounts[contact.status]++;
    }
  });

  const totalContacts = stor.length;

  const handleFilter = (status) => {
    dispatch({ type: SET_FILTER, payload: status });
  };

  return (
    <aside className="sidebar-container">
      <div className="contacts-labels">
        <div
          className={`sidebar-header contact-status-item ${filterStatus === "" ? "active-status" : ""}`}
          onClick={() => handleFilter("")}
          style={{ cursor: "pointer" }}
        >
          <span>All contacts:</span>
          <span>{totalContacts}</span>
        </div>

        <div className="contact-status-list">
          {Object.entries(dynamicStatusCounts).map(([status, count]) => (
            <div
              className={`contact-status-item ${filterStatus === status ? "active-status" : ""}`}
              key={status}
              onClick={() => handleFilter(status)}
              style={{ cursor: "pointer" }}
            >
              <span
  className={`status-badge status-${status}`}
  style={{
    backgroundColor: contactStatuss[status]?.bg,
    color: contactStatuss[status]?.color,
  }}
>
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
