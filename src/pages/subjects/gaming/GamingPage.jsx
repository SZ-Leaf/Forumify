import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserDetailsFetcher from "../../../components/user/userDetails";
import { useSecurityVerify } from "../../../components/securityCheck/security";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteThread from "../../../components/threads/threadDelete";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";

const GamesPage = () => {

   const navigate = useNavigate();
   const token = localStorage.getItem("jwt");

   useSecurityVerify();
   const [threads, setThreads] = useState(null);

   useEffect(() =>{
      (async ()  =>{
         const threadsResponse = await fetch("http://localhost:3001/api/threads");

         const threadsResponseData = await threadsResponse.json();

         setThreads(threadsResponseData);
      })();
   }, []);

   // Function to decode user ID and RoleId from JWT token
   const getLoggedInUserDetails = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
         const decodedToken = jwtDecode(token);
         return {
            userId: decodedToken.UserId,
            roleId: decodedToken.RoleId,
         }
      }
      return null;
   };

   // console.log(getLoggedInUserDetails()?.roleId)

   const handleDeleteThread = async (deletedThreadId) => {
      // Filter out the deleted thread from the state
      setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== deletedThreadId));
   };

   return(
      // a component wrapper or a higher-order component (HOC), that wraps around other components or content, providing them with additional functionality or data.
      // 
      <UserDetailsFetcher>
         {(userDetails) => (
            
         <>
            <RoleHeader token={token} />

               <h1>Gaming Threads</h1>
               <button onClick={() => navigate("/thread/create", { state : { subjectId: 2 } })}>
                  Create New Thread
               </button>


            {threads ? (
               <>
               {threads
                  // we only want the threads with subjectId = 2 which corresponds to gaming subject
                  .filter((thread) => thread.SubjectId === 2)
                  .map((thread) => (
                     
                     // key = special attribute used by React internally to optimize the process of updating and rendering components in a list. Not strictly required but makes it easier for react in updating the elements rendered.
                     <article key={thread.id}>

                     <h2>{thread.title}</h2>
                     <p>{new Date(thread.createdAt).toLocaleString()} UTC</p>

                     {/* here we are finding the user with the id link to userId foreign key in threads to show the author */}
                     
                     {userDetails && userDetails.find((user) => user.id === thread.UserId) ? (
                        <>
                        <p>Author: {userDetails.find((user) => user.id === thread.UserId).username}</p>

                        {getLoggedInUserDetails()?.userId === userDetails.find((user) => user.id === thread.UserId).id ||
                        getLoggedInUserDetails()?.roleId === 1 ? (
                          <>
                           <DeleteThread threadId={thread.id} onDelete={() => handleDeleteThread(thread.id)} />
                          </>
                        ) : null}
                        </>
                     ) : ( 
                        <p>Author: Unknown User</p>
                     )}
                     <Link to={`/thread/details/${thread.id}`}>Open thread</Link>
                     </article>
                  ))}
               </>
            ) : (
               // if threads not loaded yet, show charging on the screen in the meanwhile
               <p>Loading</p>
            )}
         </>

         )}

      </UserDetailsFetcher>
      
   );
};

export default GamesPage;