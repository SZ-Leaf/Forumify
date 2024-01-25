import { useState } from "react";
import { useSecurityVerify } from "../securityCheck/security";

const DeleteThread = ({ threadId, onDelete }) => {
   useSecurityVerify();

   const [isDeleted, setIsDeleted] = useState(false);

   const handleDeleteThread = async () => {
      const deleteThreadResponse = await fetch(`http://localhost:3001/api/threads/${threadId}`, {
         method: "DELETE",
         headers: { 
            Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
      });

      const deleteThreadResponseData = await deleteThreadResponse.json();
      // setIsDeleted(deleteThreadResponseData.success);

      if (deleteThreadResponseData.message === 'Thread deleted successfully.') {
         setIsDeleted(true);
         console.log(isDeleted);
   
         // Trigger the callback to inform the parent component to refresh its state
         if (onDelete) {
            onDelete();
         }
      } else {
         console.error("Failed to delete thread:", deleteThreadResponseData.message);
      }

   }

   const confirmDelete = () => {
      const userConfirmed = window.confirm("Are you sure you want to delete this thread?");
      if (userConfirmed) {
         handleDeleteThread();
      }
   }

   return (
      <>
         {!isDeleted && <button id="deleteThreadBtn" onClick={confirmDelete}>Delete</button>}
      </>
   );

}

export default DeleteThread;