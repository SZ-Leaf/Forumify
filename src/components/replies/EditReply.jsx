import { useState } from "react";
import { useSecurityVerify } from "../securityCheck/security";

const EditReply = ({replyId}) =>{

   useSecurityVerify();
   
   const [message, setMessage] = useState("");
   const [content, setContent] = useState("");
   const [showForm, setShowForm] = useState(false);

   const handleEditReply = async (event) => {
      event.preventDefault();
      
      const token = localStorage.getItem("jwt");

      
      const replyToEdit = {
         content: content,
      }
      const replyToEditData = JSON.stringify(replyToEdit);

      if (content.length < 3) {
         setMessage("Content length must be at least 3 characters long.");
         return; // Do not proceed with the API call
      }
      
      const replyToEditRequest = await fetch("http://localhost:3001/api/replies/" + replyId, {
         method: "PUT",
         headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: replyToEditData,
      })

      if (replyToEditRequest.status === 201) {
         setMessage("Reply Edited");
         setTimeout(() => {
            event.target.submit();
         }, 1000);
      } else {
            setMessage("Error editing Reply.");
      }

   }

   const handleEditReplyButtonClick = () => {
      if(!showForm) {
         setShowForm(true); // Set showForm to true when the button is clicked
      } else {
         setShowForm(false);
      }
   };

   const handleContentChange = (event) => {
      const newContent = event.target.value;
      setContent(newContent);
      // Check content length and set validation message
      if (newContent.length < 3) {
         setMessage("Content length must be at least 3 characters long.");
      } else {
         setMessage(null); // Clear validation message if content length is valid
      }
   }

   return(
      <>
         <button className="editReply" onClick={handleEditReplyButtonClick}>Edit Reply</button>
         {message && <p className="validationContent">{message}</p>}
         {showForm && ( // Render the form only if showForm is true
            <form onSubmit={handleEditReply}>
               <div>
                  <label>
                  <p>Content</p>
                  <textarea
                     type="text"
                     name="content"
                     value={content}
                     onChange={handleContentChange}
                  />
                  </label>
               </div>

               <input className="submit" type="submit" />
            </form>
         )}
      </>
   )

}

export default EditReply;