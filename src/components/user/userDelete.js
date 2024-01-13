import { useState } from "react";
import { useSecurityVerify } from "../securityCheck/security";
// import { Link } from "react-router-dom";

const DeleteUser = ({ userId }) => {
   useSecurityVerify();
   // const navigate = useNavigate();

   const [isDeleted, setIsDeleted] = useState(false);

   const handleDeleteUser = async () => {
      
      const deleteUserResponse = await fetch(`http://localhost:3001/api/users/${userId}`, {
         method: "DELETE",
         headers:{
            Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
      });

      const deleteUserResponseData = await deleteUserResponse.json();
      const message = deleteUserResponseData.message;

      if (message === "User has been deleted successfully.") {
         console.log(message)
         setIsDeleted(true);
      } else {
         window.alert(message);
      }
   }

   const confirmDelete = () => {
      const userConfirmed = window.confirm("Are you sure you want to delete this thread?");
      if (userConfirmed) {
         handleDeleteUser();
      }
   }

   return (
      
      <>
         {isDeleted ? <p>Thread Deleted, page refresh will cause this data to disappear!</p> : <button onClick={confirmDelete}>Delete</button>}
      </>
   );
}

export default DeleteUser;