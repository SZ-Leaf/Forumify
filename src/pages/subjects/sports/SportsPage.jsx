import { useEffect, useState } from "react";
import Header from "../../../components/user/Header"
import { Link } from "react-router-dom";
import { useSecurityVerify } from "../../securityCheck/security";
import UserDetailsFetcher from "../../../components/user/userDetails";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteThread from "../../../components/threads/threadDelete";

const SportsPage = () => {

   useSecurityVerify();
   const navigate = useNavigate();

   const [threads, setThreads] = useState(null);

   // first useEffect fetches the threads
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

   const handleDeleteThread = async (deletedThreadId) => {
      // Filter out the deleted thread from the state
      setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== deletedThreadId));
   };

   return(

      <UserDetailsFetcher>
         {(userDetails) => (
            
         <>
            <Header />
            
            <h1>Sports Threads</h1>

            <button onClick={() => navigate("/thread/create", { state : { subjectId: 1 } })}>
               Create New Thread
            </button>

            {threads ? (
               <>
               {threads
                  .filter((thread) => thread.SubjectId === 1)
                  .map((thread) => (
                     <article key={thread.id}>
                        <h2>{thread.title}</h2>
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
               <p>Loading</p>
            )}
         </>

         )}

      </UserDetailsFetcher>
   );
};

export default SportsPage;