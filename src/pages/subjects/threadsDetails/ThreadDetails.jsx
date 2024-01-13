import { useEffect, useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security"
import { useNavigate, useParams, Link } from "react-router-dom";
import UserDetailsFetcher from "../../../components/user/userDetails";
import RepliesFetcher from "../../../components/replies/repliesFetcher";
import { jwtDecode } from "jwt-decode";
import DeleteThread from "../../../components/threads/threadDelete";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";

const ThreadDetailsPage = () => {
   useSecurityVerify();

   const navigate = useNavigate();
   const token = localStorage.getItem("jwt");

   const { id } = useParams();

   const [thread, setThread] = useState(null);

   useEffect(() =>{
      (async () =>{
         const threadResponse = await fetch("http://localhost:3001/api/threads/"+ id);
         const threadResponseData = await threadResponse.json();

         setThread(threadResponseData);
         }
      )();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

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
      navigate('/subjects');
   };

   // console.log(thread);

   return (

      <RepliesFetcher>
         
         {(replies) => (

         <UserDetailsFetcher>

            {(userDetails) => (
               <>

            <RoleHeader token={token} />
                  {thread ? (
                     <>

                        <h2>{thread.data.title}</h2>
                        <p>{thread.data.content}</p>

                        {userDetails && userDetails.find((user) => user.id === thread.data.UserId) ? (

                           <>
                           <p>Author: {userDetails.find((user) => user.id === thread.data.UserId).username}</p>


                           {getLoggedInUserDetails()?.userId === userDetails.find((user) => user.id === thread.data.UserId).id ||
                           getLoggedInUserDetails()?.roleId === 1 ? (
                              
                           <>
                              <DeleteThread threadId={thread.data.id} onDelete={() => handleDeleteThread(thread.data.id)} />
                              <button><Link to={`/thread/edit/${thread.id}`}>Edit</Link></button>
                           </>
                           ) : null}
                           </>
                           
                        ) : (
                           <p>Author: Unknown User</p>
                        )}

                        {replies ? (
                           replies
                           .filter((reply) => reply.ThreadId === thread.data.id)
                           .map((filteredReply) => (
                           <div key={filteredReply.id}>
                              {/* Render each filtered reply as needed */}
                              <p>{filteredReply.content}</p>
                              <p>Author: {userDetails.find((user) => user.id === filteredReply.UserId)?.username || "Unknown."}</p>

                              {getLoggedInUserDetails()?.userId === userDetails.find((user) => user.id === filteredReply.UserId).id ||
                              getLoggedInUserDetails()?.roleId === 1 ? (
                              
                              <>
                              <button><Link to={`/reply/edit/${filteredReply.id}`}>Edit</Link></button>
                              </>
                              ) : null}

                              {/* <button><Link to={`/thread/edit/${filteredReply.id}`}>Edit</Link></button> */}
                           </div>
                           ))
                        ):(
                           <p>Loading Replies.</p>
                        )}

                     </>
                  ):(
                     <p>Loading Thread</p>
                  )}

               </>
            )}

         </UserDetailsFetcher>
      )}

      </RepliesFetcher>
   )
}

export default ThreadDetailsPage;