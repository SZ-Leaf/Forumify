import {  useState } from "react";
import { useSecurityVerify } from "../securityCheck/security";

const AddReply = ({threadId}) => {
   useSecurityVerify();
   const [content, setContent] = useState("");
   const [message, setMessage] = useState('')
   const [showForm, setShowForm] = useState(false);
   const token = localStorage.getItem("jwt");

   const handleAddReply = async (event) =>{
      event.preventDefault();

      const toAddReply = {
         content: content,
         ThreadId: threadId,
      }

      const toAddReplyData = JSON.stringify(toAddReply);

      if (content.length < 3) {
         setMessage("Content length must be at least 3 characters long.");
         return; // Do not proceed with the API call
      }

      const addReplyResponse = await fetch("http://localhost:3001/api/replies/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: toAddReplyData,
      });

      if (addReplyResponse.status === 201) {
         setMessage("Reply added !");
         setTimeout(() => {
            event.target.submit();
         }, 500);
      } else {
         setMessage("Error adding Reply.");
      }
   }

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

   const handleAddReplyButtonClick = () => {
      if(!showForm) {
         setShowForm(true); // Set showForm to true when the button is clicked
      } else {
         setShowForm(false);
      }
   };

   return(
      <>
         <button onClick={handleAddReplyButtonClick}>Add Reply</button>
         {message && <p>{message}</p>}
         {showForm && ( // Render the form only if showForm is true
            <form onSubmit={handleAddReply}>
               <div>
                  <label>
                  Content
                  <textarea
                     type="text"
                     name="content"
                     value={content}
                     onChange={handleContentChange}
                  />
                  </label>
               </div>

               <input type="submit" />
            </form>
         )}
      </>
   )
}

export default AddReply;