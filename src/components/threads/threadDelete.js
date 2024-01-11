import { useState } from "react";

const DeleteThread = ({ threadId, onDelete }) => {

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
   
         // Trigger the callback to inform the parent component to refresh its state
         if (onDelete) {
            onDelete();
         }
      } else {
         console.error("Failed to delete thread:", deleteThreadResponseData.message);
      }

   }

   return (
      <>
         {!isDeleted ? (
            <button onClick={handleDeleteThread}>Delete</button>
         ) : (
            <p>Thread Deleted</p>
         )}
      </>
   );

}

export default DeleteThread;