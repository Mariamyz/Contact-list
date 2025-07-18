import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteStatus } from "../../redux/actions";

import DeleteStatusModal from "../../components/DeleteStatusModal.jsx";
import "./ContactStatuss.scss";

export default function ContactStatuss() {
  const contactStatuss = useSelector((state) => state.contactStatuss);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState(null);

  const statusCounts = useMemo(() => {
    const counts = { ...contactStatuss };
    Object.keys(counts).forEach((status) => (counts[status].count = 0));
    contacts.forEach((contact) => {
      if (counts[contact.status]) {
        counts[contact.status].count++;
      }
    });
    return counts;
  }, [contacts, contactStatuss]);

  const handleOpenModal = (status) => {
    setStatusToDelete(status);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = (status) => {
    dispatch(deleteStatus(status));
    setIsModalOpen(false);
  };

  return (
    <main className="container rounded bg-white shadow-lg">
      <DeleteStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        status={statusToDelete}
      />

      <div className="row">
        <div className="col-12">
          <Link
            to="/contact-statuss/add-contact-status"
            className="btn btn-success btn-lg m-2"
          >
            Add +
          </Link>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status Name</th>
                <th scope="col">Color</th>
                <th scope="col">Contact Count</th>
                <th scope="col">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(statusCounts).map((status, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td
                    className={`fs-4 fw-bold status-name-${status.toLowerCase()}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </td>

                  <td
                    className={`fs-4 fw-bold status-color-${status.toLowerCase()}`}
                    style={{ backgroundColor: statusCounts[status].bg }}
                  >
                    {statusCounts[status].bg}
                  </td>

                  <td
                    className={`fs-4 fw-bold status-count-${status.toLowerCase()}`}
                  >
                    {statusCounts[status].count}
                  </td>

                  <td>
                    <Link to={`/contact-statuss/edit-contact-status/${status}`}>
                      <button className="btn btn-edit me-2 d-inline-flex align-items-center gap-1">
                        <FiEdit2 />
                        Edit
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-delete d-inline-flex align-items-center gap-1"
                      disabled={status === "others"}
                      onClick={() => handleOpenModal(status)}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
