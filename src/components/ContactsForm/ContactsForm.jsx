import * as Yup from "yup";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import { addContact } from "../../redux/contactsOps.js";
import css from "./ContactsForm.module.css";

const DEFAULT_DATA = {
  name: "",
  number: "",
};

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9\-]+$/, "Number can only contain digits and dashes")
    .min(7, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();

  const handler = (values, { resetForm }) => {
    dispatch(addContact({ ...values }));
    resetForm();
  };

  return (
    <Formik
      initialValues={DEFAULT_DATA}
      validationSchema={formSchema}
      onSubmit={handler}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.field}>
          <label htmlFor={numberId}>Number</label>
          <Field type="tel" name="number" id={numberId} />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.submit} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
