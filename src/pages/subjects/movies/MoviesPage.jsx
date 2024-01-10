import { useEffect, useState } from "react";
import Header from "../../user/Header"
import { Link } from "react-router-dom";
import UserDetailsFetcher from "../../../components/user/userDetails";
import { useSecurityVerify } from "../../securityCheck/security";

const MoviesPage = () => {

   useSecurityVerify();
   const [threads, setThreads] = useState(null);

   useEffect(() =>{
      (async ()  =>{
         const threadsResponse = await fetch("http://localhost:3001/api/threads");

         const threadsResponseData = await threadsResponse.json();

         setThreads(threadsResponseData);
      })();
   }, []);

   return(

      <UserDetailsFetcher>
         {(userDetails) => (
            
         <>
            <Header />
            <h1>Sports Threads</h1>

            {threads ? (
               <>
               {threads
                  .filter((thread) => thread.SubjectId === 3)
                  .map((thread) => (
                     <article key={thread.id}>
                        <h2>{thread.title}</h2>
                        {userDetails && userDetails.find((user) => user.id === thread.UserId) ? (
                           <p>Created by: {userDetails.find((user) => user.id === thread.UserId).username}</p>
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

export default MoviesPage;