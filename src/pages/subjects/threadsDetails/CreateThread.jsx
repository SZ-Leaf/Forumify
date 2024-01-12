import { useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security";
import Header from "../../../components/headers/Header";
import { useLocation } from "react-router-dom";

const CreateThread = () => {

   useSecurityVerify();
   const [message, setMessage] = useState(null);
   const [content, setContent] = useState("");
   const location = useLocation();
   
   console.log(location.state?.subjectId)

   const handleCreateThread = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      
      const token = localStorage.getItem("jwt");

      const newThread = {
         title: title,
         content: content,
         SubjectId: location.state?.subjectId,
      }

      const newThreadData = JSON.stringify(newThread);

      const createThreadResponse = await fetch("http://localhost:3001/api/threads/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: newThreadData,
      });


      if (createThreadResponse.status === 201) {
         setMessage("Thread created !");
         // navigate(`/threads/details/${newThreadData.id}`)
      } else {
            setMessage("Error creating Thread.");
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
      <Header />
      {message && <p>{message}</p>}
      <form onSubmit={handleCreateThread}>

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

   );

}

export default CreateThread;