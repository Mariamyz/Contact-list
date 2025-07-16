import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStatus } from "../../redux/actions";
import { useState, useEffect } from "react";
import './EditContactStatus.scss';

export default function EditContactStatus() {
  const { status } = useParams();
  const contactStatuss = useSelector(state => state.contactStatuss);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentStatus = contactStatuss[status];

  const [statusName, setStatusName] = useState("");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (currentStatus) {
      setStatusName(status);
      setColor(currentStatus.bg);
    } else {
      navigate("/contact-statuss");
    }
  }, [status, currentStatus, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStatus = {
      count: currentStatus.count,
      bg: color
    };

    dispatch(editStatus(status, statusName.trim().toLowerCase(), updatedStatus));
    navigate("/contact-statuss");
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="edit-status-container modal-content rounded shadow"
      >
        <h1 className="text-center">Edit contact status</h1>
        <hr />
        <div className="mb-3">
          <label htmlFor="statusName">Status name</label>
          <input
            type="text"
            className="form-control fs-5"
            id="statusName"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            className="ms-3 mt-1 fs-5"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning btn-lg form-control">
          Save
        </button>
      </form>
    </div>
  );
}
