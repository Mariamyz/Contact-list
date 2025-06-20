import './AddContact.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactValidationSchema } from '../../validation/validation';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { IMaskInput } from 'react-imask';
import { BsHeart, BsHeartFill, BsTelephone } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/actions';

export default function AddContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    id: uuidv4(),
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    avatar: '',
    gender: '',
    status: '',
    favorite: false
  };

  const handleSubmit = (values) => {
    dispatch(addContact(values));
    navigate('/');
  };

  return (
    <div className="contact-wrapper">
      <div className="add-form">
        <h2>Add new contact</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={contactValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (

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
                  <div className="phone-field">
                    <BsTelephone className="phone-icon" />
                    <Field name="phone">
                      {({ field, form }) => (
                        <IMaskInput
                          {...field}
                          mask="+{38} (000) 000-00-00"
                          className="form-control"
                          placeholder="+38 (0XX) XXX-XX-XX"
                          onAccept={(value) => form.setFieldValue('phone', value)}
                        />
                      )}
                    </Field>
                  </div>
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
                  <Field name="favorite" type="checkbox">
                    {({ field, form }) => (
                      <span
                        onClick={() => form.setFieldValue('favorite', !field.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        {field.value ? <BsHeartFill size={20} color="red" /> : <BsHeart size={20} />}
                      </span>
                    )}
                  </Field>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
