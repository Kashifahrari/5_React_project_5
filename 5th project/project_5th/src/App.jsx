import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { ToastContainer, toast } from "react-toastify";

import AddUpdate from "./components/AddUpdate";

const App = () => {
  const [contact, setContact] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactRef = collection(db, "Contacts");

        onSnapshot(contactRef, (snapShot) => {
          const contactList = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  const searchList = (e) => {
    const val = e.target.value;

    const contactRef = collection(db, "Contacts");

    onSnapshot(contactRef, (snapShot) => {
      const contactList = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredList = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(val.toLowerCase()),
      );

      setContact(filteredList);
      return filteredList;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <NavBar />
        <div className="relative flex items-center">
          <FaSearch className="absolute ml-2 text-2xl text-white" />
          <input
            onChange={searchList}
            type="text"
            className="h-10 flex-grow rounded border border-white bg-transparent pl-10 text-white"
          />
          <FaPlusCircle
            onClick={onOpen}
            className="ml-3 cursor-pointer text-3xl text-white"
          />
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {contact.map((con) => (
            <ContactCard key={con.id} con={con} />
          ))}
        </div>
      </div>
      <AddUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer />
    </>
  );
};

export default App;
