import RoleHeader from "../../components/headers/RoleHeaderCheck"
import { useSecurityVerify } from "../../components/securityCheck/security"
import UserDetailsFetcher from "../../components/user/userDetails";
import DeleteUser from "../../components/user/userDelete";
// import { Link } from "react-router-dom";
// import { useState } from "react";

const UsersPanel = () => {
   useSecurityVerify();

   const token = localStorage.getItem("jwt");

   // const [updateTrigger, setUpdateTrigger] = useState(false);

   // Function to toggle the updateTrigger state
   // const toggleUpdateTrigger = () => {
   //    console.log('Toggling update trigger');
   //    setUpdateTrigger((prev) => !prev);
   // };

   const handleRefresh = () => {
      window.location.reload(); // Reload the page
   };

   return(
      <>
         <RoleHeader  token={token} />
         
         <UserDetailsFetcher>
            {(userDetails) =>
               userDetails && userDetails
                  .filter((user) => user.RoleId === 2)
                  .map((user) => (
                     <div key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Created at: {new Date(user.createdAt).toLocaleString()} UTC</p>
                        <p>Last Updated at: {new Date(user.updatedAt).toLocaleString()} UTC</p>
                        <DeleteUser userId={user.id} onSuccess={handleRefresh}/>
                     </div>
                  ))
            }
         </UserDetailsFetcher>
         
         <button onClick={handleRefresh}>Refresh Page</button>
      </>
   )

}

export default UsersPanel;