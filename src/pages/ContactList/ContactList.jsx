import { useSelector } from 'react-redux';
import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ContactList() {
  const contacts = useSelector(state => state.contacts);
  const searchTerm = useSelector(state => state.search).toLowerCase();

  const filtered = searchTerm
    ? contacts.filter(contact => {
        const term = searchTerm.toLowerCase();
        return (
          contact.firstName.toLowerCase().startsWith(term) ||
          contact.lastName.toLowerCase().startsWith(term)
        );
      })
    : contacts;

  return (
    <div className="container rounded bg-white shadow-lg">
      <div className="row">
        <div className="col-3">
          <Sidebar stor={filtered} />
        </div>
        <div className="col-9">
          <ContactItem stor={filtered} />
        </div>
      </div>
    </div>
  );
}
