import { useSelector } from "react-redux";
import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ContactList() {
  const contacts = useSelector((state) => state.contacts);
  const searchTerm = useSelector((state) => state.search).toLowerCase();
  const filterStatus = useSelector((state) => state.filterStatus);

  const filtered = contacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().startsWith(searchTerm) ||
      contact.lastName.toLowerCase().startsWith(searchTerm);
    const matchesStatus = filterStatus ? contact.status === filterStatus : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container rounded bg-white shadow-lg">
      <div className="row">
        <div className="col-3">
          <Sidebar stor={contacts} />
        </div>
        <div className="col-9">
          <ContactItem stor={filtered} />
        </div>
      </div>
    </div>
  );
}
