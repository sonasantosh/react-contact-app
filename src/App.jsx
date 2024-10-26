import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import UpdateContacts from "./components/UpdateContacts";
import useDisclouse from "./hooks/UseDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filteredContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filterContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filterContacts);
      return filterContacts;
    });
  };

  return (
    <>
      <div className="appWrapper max-w-[360px] mx-auto m-3">
        <Navbar />

        <div className="relative search-contact flex gap-3 items-center py-3">
          <FiSearch className="text-white absolute left-3 cursor-pointer" />
          <input
            onChange={filteredContacts}
            type="text"
            name="SearchContact"
            id="SearchContact"
            placeholder="Search Contact"
            className="bg-transparent rounded-lg border-2 text-white ps-8 pe-2 h-[40px] grow"
          />

          <button
            onClick={onOpen}
            className="text-lg bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center font-bold"
          >
            <IoMdAdd />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <PageNotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <UpdateContacts onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
