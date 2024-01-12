import { useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";


const EditThread = () => {

   useSecurityVerify();

   const [threadEdit, setThreadEdit] = useState(null);
   const [message, setMessage] = useState("");
   
   const [content, setContent] = useState("");

   const handleEditThread = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      const content = event.target.content.value;

      
      const token = localStorage.getItem("jwt");

      const newThread = {

         title: title,
         content: content,
         // SubjectId: location.state?.subjectId,
         
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

   return(
      <>
         <RoleHeader />
         <form onSubmit={handleEditThread}>

            <div>
               <label>
                  Title
                  <input type="text" name="title" />
               </label>
            </div>
               
            <div>
               <label> 
                  Content
                  <textarea type="text" name="content" value={content} onChange={handleContentChange} />
               </label>
            </div>

         </form>
      </>
   )
}


export default EditThread;