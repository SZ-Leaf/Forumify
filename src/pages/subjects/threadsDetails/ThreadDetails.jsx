import { useEffect, useState } from "react";
import { useSecurityVerify } from "../../../components/securityCheck/security"
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteThread from "../../../components/threads/threadDelete";
import RoleHeader from "../../../components/headers/RoleHeaderCheck";
import AddReply from "../../../components/replies/AddReply";
import DeleteReply from "../../../components/replies/DeleteReply";
import EditThread from "./EditThread";
import EditReply from "../../../components/replies/EditReply";
import './styles/detailsStyles.css'

const ThreadDetailsPage = () => {
   useSecurityVerify();

   const navigate = useNavigate();
   const token = localStorage.getItem("jwt");

   const { id } = useParams();

   const [thread, setThread] = useState(null);
   const [users, setUsers] = useState(null);

   useEffect(() =>{
      (async () =>{
         const threadResponse = await fetch("http://localhost:3001/api/threads/"+ id);
         const threadResponseData = await threadResponse.json();

         setThread(threadResponseData);
         // console.log(threadResponseData);
         
         }
      )();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   useEffect(() =>{
      (async () =>{
         const usersResponse = await fetch("http://localhost:3001/api/users/");
         const usersResponseData = await usersResponse.json();

         setUsers(usersResponseData);
         
         }
      )();
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

   // // console.log(thread);
   // console.log(thread?.data?.Replies);
   
   
   const handleRefresh = () => {
      window.location.reload(); // Reload the page
   };


   return (
         <div className="root1">

               <RoleHeader token={token} />

                  {thread ? (
                     <div key={thread.id} className="threadDetails-main">
                        <div className="main-threadDiv">
                           <div className="thread-div">
                              <h2>{thread.data.title}</h2>
                              <p className="threadContent">{thread.data.content}</p>
                              <div className="credentials">
                                 <div>
                                 <p>Created at: {new Date(thread.data.createdAt).toLocaleString()} UTC</p>
                                 <p>Author: {thread.data.User?.username}</p>
                                 </div>
                                 <div className="edit-delete-div">
                                 {getLoggedInUserDetails()?.userId === thread.data.UserId ||
                                 getLoggedInUserDetails()?.roleId === 1 ? (
                                    <>
                                    <DeleteThread threadId={thread.data.id} onDelete={() => handleDeleteThread(thread.data.id)} />
                                    <EditThread threadId={thread.data.id} />
                                    </>
                                 ) : null}
                                 </div>
                              </div>
                              
                           </div>
                           <AddReply threadId={thread.data.id} />
                        </div>
                        
                        <div className="replies">
                        
                        {thread.data.Replies && thread.data.Replies.length > 0 ? (
                           thread.data.Replies.map((reply) => (

                              <div key={reply.id} className="reply-div">
                                 <p>{reply.content}</p>
                                 <p>Author: {users && users.find((user) => user.id === reply.UserId)?.username}</p>
                                 <p>Created at: {new Date(reply.createdAt).toLocaleString()} UTC</p>
                                 {getLoggedInUserDetails()?.userId === reply.UserId ||
                                 getLoggedInUserDetails()?.roleId === 1 ? (
                                 
                                 <>
                                 {/* <button><Link to={`/reply/edit/${filteredReply.id}`}>Edit</Link></button> */}
                                 <EditReply replyId={reply.id} />
                                 <DeleteReply replyId={reply.id} onReplyDeletedt={handleRefresh}/>
                                 
                                 </>
                                 ) : null}
                              </div>
                           ))
                        ) : (
                           <p>No replies yet.</p>
                        )}
                        
                        </div>

                     </div>
                  ):(
                     <p>Loading Thread</p>
                  )}

         </div>
   )
}

export default ThreadDetailsPage;