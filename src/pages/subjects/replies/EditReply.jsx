import { useState } from "react";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";
import { useParams } from "react-router-dom";
import { useSecurityVerify } from "../../securityCheck/security";

const EditReply = () =>{

   useSecurityVerify();

   const {id} = useParams();
   
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

   const handleEditReply = async (event) => {
      event.preventDefault();
      
      const token = localStorage.getItem("jwt");

      
      const replyToEdit = {

         content: content,
         
      }
      const replyToEditData = JSON.stringify(replyToEdit);
      
      const replyToEditRequest = await fetch("http://localhost:3001/api/replies/" +id, {
         method: "PUT",
         headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: replyToEditData,
      })

      if (replyToEditRequest.status === 201) {
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
         <form onSubmit={handleEditReply}>
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

export default EditReply;