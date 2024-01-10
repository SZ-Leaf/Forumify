import { useEffect, useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security"
import Header from "../../user/Header"
import { useParams } from "react-router-dom";
import UserDetailsFetcher from "../../../components/user/userDetails";
import RepliesFetcher from "../../../components/replies/repliesFetcher";

const GamingThreadDetailsPage = () => {
   useSecurityVerify();

   const { id } = useParams();

   const [gamingThread, setGamingThread] = useState(null);

   useEffect(() =>{
      (async () =>{
         const gamingThreadResponse = await fetch("http://localhost:3001/api/threads/"+ id);
         const gamingThreadResponseData = await gamingThreadResponse.json();

         setGamingThread(gamingThreadResponseData);
         }
      )();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);


   return (

      <RepliesFetcher>

         {(replies) => (

      <UserDetailsFetcher>

         {(userDetails) => (
            <>

               <Header />

               {gamingThread ? (
                  <>

                     <h2>{gamingThread.data.title}</h2>
                     <p>{gamingThread.data.content}</p>

                     {userDetails && userDetails.find((user) => user.id === gamingThread.data.UserId) ? (
                        <p>Author: {userDetails.find((user) => user.id === gamingThread.data.UserId).username}</p>
                     ) : (
                        <p>Created by: Unknown User</p>
                     )}

                     {replies ? (
                        replies
                        .filter((reply) => reply.ThreadId === gamingThread.data.id)
                        .map((filteredReply) => (
                          <div key={filteredReply.id}>
                            {/* Render each filtered reply as needed */}
                            <p>{filteredReply.content}</p>
                            <p>Author: {userDetails.find((user) => user.id === filteredReply.UserId)?.username || "Unknown User"}</p>
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

export default GamingThreadDetailsPage;