import { useState } from "react";
import { useSecurityVerify } from "../securityCheck/security";

const DeleteReply = ({ replyId, onReplyDeleted }) => {
   useSecurityVerify();

   const [isDeleted, setIsDeleted] = useState(false);
   // console.log(replyId)

   const handleDeleteReply = async () => {
      const deleteReplyResponse = await fetch(`http://localhost:3001/api/replies/` + replyId ,{
         method: "DELETE",
         headers: { 
            Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
      });

      const deleteReplyResponseData = await deleteReplyResponse.json();
      // console.log(deleteReplyResponseData)

      if (deleteReplyResponseData.message === 'Reply deleted successfully.') {
         setIsDeleted(true);
         console.log(isDeleted);

         if (onReplyDeleted) {
            onReplyDeleted();
         }
   
         // Trigger the callback to inform the parent component to refresh its state
         // if (onDelete) {
         //    onDelete();
         // }
      } else {
         console.error("Failed to delete thread:", deleteReplyResponseData.message);
      }

   }

   const confirmDelete = () => {
      const userConfirmed = window.confirm("Are you sure you want to delete this reply?");
      if (userConfirmed) {
         handleDeleteReply();

      }
   }

   return (
      <>
         {!isDeleted && <button onClick={confirmDelete}>Delete</button>}
      </>
   );

}

export default DeleteReply;