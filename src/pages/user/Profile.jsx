import { jwtDecode } from "jwt-decode";
import RoleHeader from "../../components/headers/RoleHeaderCheck";
import { useSecurityVerify } from "../../components/securityCheck/security";
import { useEffect, useState } from "react";
import DeleteReply from "../../components/replies/DeleteReply";
import DeleteThread from "../../components/threads/threadDelete";
import { Link } from "react-router-dom";
import './profileStyle/profileStyle.css'


const ProfilePage = () => {

   useSecurityVerify();

   const token = localStorage.getItem('jwt');
   const tokenDecode = jwtDecode(token);

   // console.log(tokenDecode.UserId)

   const [user, setUser] = useState(null);

   useEffect(() =>{
      (async ()  =>{
         const useResponse = await fetch(`http://localhost:3001/api/users/${tokenDecode.UserId}`);

         const useResponseData = await useResponse.json();

         setUser(useResponseData);
      })();
   }, [tokenDecode.UserId]);

   // console.log(tokenDecode.UserId)
   // console.log(user?.data?.Threads);
   // console.log(user?.data?.id)

   const handleRefresh = () => {
      window.location.reload(); // Reload the page
   };

   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
   const [passwordChangeError, setPasswordChangeError] = useState("");

   const handleUpdatePassword = async () => {
      if (newPassword !== confirmPassword) {
         setPasswordChangeError("Passwords do not match.");
         return;
      }

      try {
         const response = await fetch(`http://localhost:3001/api/users/${tokenDecode.UserId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password: newPassword }),
         });

         if (response.ok) {
            setPasswordChangeSuccess(true);
            setNewPassword("");
            setConfirmPassword("");
         } else {
            const errorData = await response.json();
            setPasswordChangeError(errorData.message || "Password change failed.");
         }
      } catch (error) {
         console.error("Password change error:", error);
         setPasswordChangeError("Password change failed. Please try again later.");
      }
   };

   const [showPasswordForm, setShowPasswordForm] = useState(false);

   const togglePasswordForm = () => {
      setShowPasswordForm((prev) => !prev);
      setPasswordChangeSuccess(false);
      setPasswordChangeError("");
   };
   

   return(
      <div className="root1">
         <RoleHeader token={token} />

         <div className="profileMain">
            <h2>Welcome {tokenDecode.data}</h2>

            <div className="passwordChange">
               <button className="passwordManagerButton" type="button" onClick={togglePasswordForm}>
                  Password Manager
               </button>
               {showPasswordForm && (
                  <form className="passwordChangeForm">
                     <label className="passwordLabel">New Password:</label>
                     <input
                        className="passwordInput"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                     />
                     <label className="passwordLabel">Confirm Password:</label>
                     <input
                        className="passwordInput"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                     <button className="changePasswordButton" type="button" onClick={handleUpdatePassword}>
                        Change Password
                     </button>
                     {passwordChangeSuccess && <p className="successMessage">Password changed successfully!</p>}
                     {passwordChangeError && <p className="errorMessage">{passwordChangeError}</p>}
                  </form>
               )}
            </div>

            <div className="threadList">
               <h3>Own Threads List</h3>
               {user?.data?.Threads && user.data.Threads.length > 0 ? (
                     user.data.Threads.map((thread) => (
                        <div className="ownThreadDiv" key={thread.id}>
                           <h4>{thread.title}</h4>
                           <p className="threadContent">{thread.content}</p>
                           <div className="edit-delete-div">
                              <DeleteThread threadId={thread.id} onDelete={handleRefresh} />
                              <button className="toThread"><Link to={`/thread/details/${thread.id}`}>Thread</Link></button>
                           </div>
                        </div>
                     ))
               ) : (
                  <p>No Replies</p>
               )}
            </div>
            <div className="replyList">
               <h3>Own Replies List</h3>
               {user?.data?.Replies && user.data.Replies.length > 0 ? (
                  user.data.Replies.map((reply) => (
                     <div className="replyDiv" key={reply.id}>
                           <p>{reply.content}</p>
                           <div className="edit-delete-div">
                              <DeleteReply replyId={reply.id} onReplyDeleted={handleRefresh}/>
                              <button className="toThread"><Link to={`/thread/details/${reply.ThreadId}`}>Thread</Link></button>
                           </div>
                     </div>
                  ))
               ):(
                  <></>
               )}
            </div>
         </div>
         {/* <RepliesFetcher>
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
         </RepliesFetcher> */}
      </div>
   )
};

export default ProfilePage;