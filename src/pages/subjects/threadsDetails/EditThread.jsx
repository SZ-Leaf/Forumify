import { useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";
import { useParams } from "react-router-dom";


const EditThread = () => {

   useSecurityVerify();
   const { id } = useParams();

   // const [threadEdit, setThreadEdit] = useState(null);
   const [message, setMessage] = useState("");
   const [content, setContent] = useState("");

   
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

   const handleEditThread = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      // const content = event.target.content.value;

      
      const token = localStorage.getItem("jwt");

      const threadToEdit = {

         title: title,
         content: content,
         // SubjectId: location.state?.subjectId,
         
      }

      const threadToEditData = JSON.stringify(threadToEdit);

      const threadToEditRequest = await fetch("http://localhost:3001/api/threads/" + id , {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: threadToEditData,
      })

      if (threadToEditRequest.status === 201) {
         setMessage("Thread edited !");
         // navigate(`/threads/details/${newThreadData.id}`)
      } else {
            setMessage("Error editing Thread.");
      }

   }

   return(
      <>
         <RoleHeader />
         {message && <p>{message}</p>}
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
            <input type="submit" />
         </form>
      </>
   )
}


export default EditThread;