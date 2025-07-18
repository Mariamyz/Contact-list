import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ContactList from "./pages/ContactList/ContactList";
import AddContact from "./pages/AddContact/AddContact";
import EditContact from "./pages/EditContact/EditContact";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

// ДОДАНО:
import ContactStatuss from "./pages/ContactStatus/ContactStatuss";
import AddContactStatus from "./pages/AddContactStatus/AddContactStatus";
import EditContactStatus from "./pages/EditContactStatus/EditContactStatus";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/update-contact/:id" element={<EditContact />} />
            <Route path="/contact-statuss" element={<ContactStatuss />} />
            <Route
              path="/contact-statuss/add-contact-status"
              element={<AddContactStatus />}
            />
            <Route
              path="/contact-statuss/edit-contact-status/:status"
              element={<EditContactStatus />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
