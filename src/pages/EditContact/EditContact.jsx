import './EditContact.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactValidationSchema } from '../../validation/validation';
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function EditContact({ stor, editContact }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = stor.find(contact => contact.id === id);

  if (!contact) {
    return <h2 className="text-center mt-5 text-danger">Contact not found</h2>;
  }

  const initialValues = { ...contact };

  const handleSubmit = (values) => {
    editContact(values);
    navigate('/');
  };

  return (
    <div className="contact-wrapper">
      <div className="add-form">
        <h2>Edit contact</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={contactValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (

            <Form>
              <div className="grid-two">
                <div>
                  <label>First Name</label>
                  <Field name="firstName" className="form-control" placeholder="Enter first name" />
                  <ErrorMessage name="firstName" component="div" className="error" />
                </div>
                <div>
                  <label>Last Name</label>
                  <Field name="lastName" className="form-control" placeholder="Enter last name" />
                  <ErrorMessage name="lastName" component="div" className="error" />
                </div>

                <div>
                  <label>Phone</label>
                  <Field name="phone" className="form-control" placeholder="+38 (0XX) XXX-XX-XX" />
                  <ErrorMessage name="phone" component="div" className="error" />
                </div>

                <div>
                  <label>Email</label>
                  <Field name="email" className="form-control" placeholder="Enter email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>

                <div>
                  <label>Avatar</label>
                  <Field name="avatar" className="form-control" placeholder=" " type="number" />
                  <ErrorMessage name="avatar" component="div" className="error" />
                </div>

                <div>
                  <label>Gender</label>
                  <Field name="gender" as="select" className="form-control">
                    <option value="">Choose gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="error" />
                </div>

                <div>
                  <label>Status</label>
                  <Field name="status" as="select" className="form-control">
                    <option value="">Choose status</option>
                    <option value="work">Work</option>
                    <option value="family">Family</option>
                    <option value="friends">Friends</option>
                    <option value="private">Private</option>
                    <option value="others">Others</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="error" />
                </div>

                <div className="favorite-row">
                  <label>Favorite</label>
                  <span
                    onClick={() => setFieldValue('favorite', !values.favorite)}
                    style={{ cursor: 'pointer' }}
                  >
                    {values.favorite ? <BsHeartFill size={20} color="red" /> : <BsHeart size={20} />}
                  </span>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
