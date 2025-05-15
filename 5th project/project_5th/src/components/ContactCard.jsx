import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { useState } from "react";
import AddUpdate from "./AddUpdate";
import { toast } from "react-toastify";

const ContactCard = ({ con }) => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const delContact = async (id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await deleteDoc(contactRef);
      console.log("Contact deleted:", id);
      toast.success("Deleted Successfuly");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div
        key={con.id}
        className="flex items-center justify-between rounded-lg bg-yellow p-2"
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="">
            <h2 className="text-medium text-lg">{con.name}</h2>
            <p className="text-sm">{con.email}</p>
          </div>
        </div>
        <div className="tex flex">
          <IoMdTrash
            onClick={() => {
              delContact(con.id);
            }}
            className="text-4xl"
          />
          <RiEditCircleLine
            onClick={onOpen}
            className="cursor-pointer text-4xl text-orange"
          />
        </div>
      </div>
      <AddUpdate con={con} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
