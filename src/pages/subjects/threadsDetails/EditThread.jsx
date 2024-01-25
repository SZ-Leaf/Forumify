import { useState } from "react";
import { useSecurityVerify } from "../../../components/securityCheck/security";


const EditThread = ({threadId}) => {

   useSecurityVerify();

   // const [threadEdit, setThreadEdit] = useState(null);
   const [message, setMessage] = useState("");
   const [content, setContent] = useState("");
   const [showForm, setShowForm] = useState(null);

   
   const handleReplyEdit = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      const token = localStorage.getItem("jwt");

      const threadToEdit = {
         content: content,
         title: title,
         // SubjectId: location.state?.subjectId,
         
      }

      const threadToEditData = JSON.stringify(threadToEdit);

      if (content.length < 10) {
         setMessage("Content length must be at least 3 characters long.");
         return; // Do not proceed with the API call
      }

      const threadToEditRequest = await fetch("http://localhost:3001/api/threads/" + threadId , {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: threadToEditData,
      })

      if (threadToEditRequest.status === 201) {
         setMessage("Thread updated successfully.");
         setTimeout(() => {
            event.target.submit();
         }, 2000);
      } else {
         setMessage("Error editing Thread.");
      }
   }

   const handleContentChange = (event) => {
      const newContent = event.target.value;
      setContent(newContent);
      // Check content length and set validation message
      if (newContent.length < 10) {
         setMessage("Content length must be at least 10 characters long.");
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
         <button id="editThreadBtn" onClick={handleAddReplyButtonClick}>Edit Thread</button>
         {message && <p className="validationContent">{message}</p>}
         {showForm && ( // Render the form only if showForm is true
            <form onSubmit={handleReplyEdit}>
               <div>
                  <label>
                  <p>Title</p>
                  <textarea className="titleTextArea"
                     type="text"
                     name="title"
                     maxLength={50}
                  /></label>
               </div>
               <div>
                  <label>
                  <p>Content</p>
                  <textarea className="contentTextArea"
                     type="text"
                     name="content"
                     maxLength={1000}
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


export default EditThread;