import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStatus } from "../../redux/actions";
import { useState, useEffect } from "react";
import "./EditContactStatus.scss";

export default function EditContactStatus() {
  const { status } = useParams();
  const contactStatuss = useSelector((state) => state.contactStatuss);
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
      bg: color,
    };

    dispatch(
      editStatus(status, statusName.trim().toLowerCase(), updatedStatus),
    );
    navigate("/contact-statuss");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="modal-content p-4 rounded shadow"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h2 className="text-center mb-3">Edit contact status</h2>
        <hr />
        <div className="mb-3">
          <label htmlFor="statusName" className="form-label">
            Status name
          </label>
          <input
            type="text"
            className="form-control"
            id="statusName"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="color" className="me-2">
            Color
          </label>
          <input
            type="color"
            id="color"
            className="form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Save
        </button>
      </form>
    </div>
  );
}
