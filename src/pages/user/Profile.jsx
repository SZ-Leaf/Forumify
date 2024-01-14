import { jwtDecode } from "jwt-decode";
import RoleHeader from "../../components/headers/RoleHeaderCheck";
import { useSecurityVerify } from "../../components/securityCheck/security";
import { useEffect, useState } from "react";
import RepliesFetcher from "../../components/replies/repliesFetcher";
import DeleteReply from "../../components/replies/DeleteReply";
import DeleteThread from "../../components/threads/threadDelete";
import { Link } from "react-router-dom";


const ProfilePage = () => {

   useSecurityVerify();

   const token = localStorage.getItem('jwt');
   const tokenDecode = jwtDecode(token);

   // console.log(tokenDecode.UserId)

   const [threads, setThreads] = useState(null);

   useEffect(() =>{
      (async ()  =>{
         const threadsResponse = await fetch("http://localhost:3001/api/threads");

         const threadsResponseData = await threadsResponse.json();

         setThreads(threadsResponseData);
      })();
   }, []);

   // console.log(tokenDecode.UserId)
   // console.log(threads)

   const handleRefresh = () => {
      window.location.reload(); // Reload the page
   };
   

   return(
      <div>
         <RoleHeader token={token} />

         <h2>Welcome {tokenDecode.data}</h2>

         
         <div>
            <h3>Own Threads List</h3>
            {threads ? (
               <div>
                  {threads
                     .filter((thread) => thread.UserId === tokenDecode.UserId)
                     .map((thread) => (
                        <article key={thread.id}>
                           <h2>{thread.title}</h2>
                           <DeleteThread threadId={thread.id} onDelete={handleRefresh} />
                        </article>
                     ))
                  }
               </div>
               ) : (

               <p>Loading threads</p>

               )
            }

         </div>

         <RepliesFetcher>
            {(replies) => (
               <div>
                  {replies ? (
                     replies
                        .filter((reply) => reply.UserId === tokenDecode.UserId)
                        .map((filteredReply) => (
                           <article key={filteredReply.id}>
                              <p>{filteredReply.content}</p>
                              <DeleteReply replyId={filteredReply.id} onReplyDeleted={handleRefresh}/>
                              <button><Link to={`/thread/details/${filteredReply.ThreadId}`}>Thread</Link></button>
                           </article>
                        ))
                  ):(
                     <p>Loading Replies</p>
                  )}
               </div>
               )
            }
         </RepliesFetcher>

         <form action="

         "></form>
      </div>
   )
};

export default ProfilePage;