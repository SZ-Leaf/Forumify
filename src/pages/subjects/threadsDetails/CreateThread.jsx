import { useState, useEffect } from "react";
import { useSecurityVerify } from "../../../components/securityCheck/security";
import { useLocation, useNavigate } from "react-router-dom";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";
import './styles/createThread/createStyle.css'

const CreateThread = () => {

   useSecurityVerify();
   const navigate = useNavigate();
   const [message, setMessage] = useState(null);
   const [content, setContent] = useState("");
   const location = useLocation();
   const token = localStorage.getItem("jwt");

   // console.log(location.state);

   useEffect(() => {
      // Check if subjectId is present in location.state
      if (!location.state || !location.state.subjectId) {
         // Redirect to '/subjects' if subjectId is null or undefined
         navigate("/subjects");
      }
   })

   const handleCreateThread = async (event) => {
      
      event.preventDefault();
      const title = event.target.title.value;

      const newThread = {
         title: title,
         content: content,
         SubjectId: location.state.subjectId,
      }

      console.log(newThread.SubjectId);
      const newThreadData = JSON.stringify(newThread);

      const createThreadResponse = await fetch("http://localhost:3001/api/threads/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: newThreadData,
      });

      console.log(createThreadResponse)


      if (createThreadResponse.status === 201) {
         setMessage("Thread created !");
         navigate(-1);
         
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
         setMessage("Ready to Create"); // Clear validation message if content length is valid
      }
   }

   return(

      <div className="root1">
      <RoleHeader token={token} />
      <div className="createThreadMain">

         {message && <p>{message}</p>}

         <h1>New Thread</h1>

         <form onSubmit={handleCreateThread}>

            <div>
               <label>
                  <p>Title</p>
                  
                  <input type="text" maxLength={50} name="title" />
               </label>
            </div>
               
            <div>
               <label> 
                  <p>Content</p>
                  
                  <textarea type="text" maxLength={1000} name="content" value={content} onChange={handleContentChange} />
               </label>
            </div>

            <input type="submit" className="createThreadBtn" value='Create' />
         </form>

      </div>
    </div>

   );

}

export default CreateThread;