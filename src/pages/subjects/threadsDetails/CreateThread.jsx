import { useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security";
import Header from "../../../components/user/Header";
import { useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const CreateThread = () => {

   useSecurityVerify();
   const [message, setMessage] = useState(null);
   const [content, setContent] = useState("");
   // const navigate = useNavigate();
   const location = useLocation();

   const handleCreateThread = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      // const content = event.target.content.value;

      
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

      const responseData = await createThreadResponse.json();
      console.log(responseData);

      if (createThreadResponse.status === 201) {
         setMessage("Thread created !");
      } else {
         if (createThreadResponse.status === 400 && responseData.errors) {
            // Display validation errors
            const validationMessages = responseData.errors.map((error) => `${error.field}: ${error.message}`);
            setMessage(`Validation Error: ${validationMessages.join(', ')}`);
         } else {
            setMessage("Error creating Thread.");
         }
      }
   }

   const handleContentChange = (event) => {
      setContent(event.target.value);
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