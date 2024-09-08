import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps.js";
import { FaUser, FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.contact}>
      <div className={css.details}>
        <div>
          <FaUser /> {name}
        </div>
        <div>
          <FaPhone /> {number}
        </div>
      </div>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </li>
  );
};
export default Contact;
