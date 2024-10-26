import { IoMdTrash } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import UpdateContacts from "./UpdateContacts";
import useDisclouse from "../hooks/UseDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.warn("Contact has been Deleted Successfully.")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-yellow rounded-sm p-2 flex justify-between items-center gap-2">
        <HiOutlineUserCircle className="text-[40px] text-green-600" />
        <div className="w-[250px]">
          <h2 className="font-bold text-[16px]">{contact.name}</h2>
          <p className="font-normal text-[14px]">{contact.email}</p>
        </div>
        <div className=" w-[40px] flex items-center justify-end gap-1">
          <RiEditCircleLine
            onClick={onOpen}
            className="text-[20px] text-green-600 cursor-pointer"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-[20px] text-red-600 cursor-pointer"
          />
        </div>
      </div>
      <UpdateContacts
        contact={contact}
        isOpen={isOpen}
        onClose={onClose}
        isUpdate
      />
    </>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
};

export default ContactCard;
