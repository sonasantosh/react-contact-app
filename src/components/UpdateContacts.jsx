import PropTypes from "prop-types";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { object, string } from 'yup';

let contactSchema = object({
  name: string().required("Name is Required!"),
  email: string().email("Invalid Email").required("Email is Required!"),
});


const UpdateContacts = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact has been Added Successfully.")
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact has been Updated Successfully.")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name:</label>
              <Field name="name" className="rounded-sm p-2 h-10 border" />
              <div className="text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                className="rounded-sm p-2 h-10 border"
              />
              <div className="text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="border px-4 py-2 bg-orange">
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

UpdateContacts.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isUpdate: PropTypes.bool,
  contact: PropTypes.object,
};

export default UpdateContacts;
