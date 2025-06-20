import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../redux/actions"; 

export default function Header() {
  const searchTerm = useSelector(state => state.search);
  const dispatch = useDispatch();

  return (
    <header className="container rounded shadow-lg bg-white mb-3 mt-3">
      <div className="row">
        <div className="col-12">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <div className="navbar-brand">
                <Link className="navbar-brand" to="/">
                  Contact List
                </Link>
                <Link className="navbar-brand" to="/add-contact">
                  Add Contact
                </Link>
              </div>

              <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
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
