import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addStatus } from "../../redux/actions";

export default function AddContactStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusName, setStatusName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addStatus(statusName.trim(), color));

    setStatusName("");
    setColor("#000000");

    navigate("/contact-statuss");
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f8f8",
          width: "600px",
          padding: "40px 30px",
          margin: "10px auto",
        }}
        className="modal-content rounded shadow"
      >
        <h1 className="text-center" style={{ color: "#2e7d32" }}>
          Add contact status
        </h1>
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
        <button type="submit" className="btn btn-success btn-lg form-control">
          Add
        </button>
      </form>
    </div>
  );
}
