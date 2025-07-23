import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/actions";
import "./Header.scss";

export default function Header() {
  const searchTerm = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <header className="container rounded shadow-lg custom-header mb-3 mt-3">
      <div className="row">
        <div className="col-12">
        <nav className="navbar custom-navbar">
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Contact List
                </NavLink>

                <NavLink
                  to="/add-contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Add Contact
                </NavLink>

                <NavLink
                  to="/contact-statuss"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Status
                </NavLink>
              </div>

              <form
                className="d-flex"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => dispatch(search(e.target.value))}
                />
              </form>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
