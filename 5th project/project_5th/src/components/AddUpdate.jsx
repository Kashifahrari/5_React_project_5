import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddUpdate = ({ isOpen, onClose, isUpdate, con }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: con.name,
                  email: con.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            !isUpdate ? addContact(values) : updateContact(values, con.id);
          }}
        >
          <Form>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 rounded-md border" />
              <div className="text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="name">Email</label>
              <Field name="email" className="h-10 rounded-md border" />
            </div>
            <div className="text-xs">
              <ErrorMessage name="email" className="text-red-500" />
            </div>
            <button className="py-1.2 m-1.5 cursor-pointer justify-center rounded-md bg-orange px-3 text-center">
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddUpdate;
