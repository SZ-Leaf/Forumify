import { useEffect, useState } from "react";

// { children } is used to handle and use the result because our result is a json array, it will contain the userDetails const we created in which we will store the json array returned.
const RepliesFetcher = ({ children }) => {
  const [replies, setReply] = useState(null);

   useEffect(() => {
      const fetchReplyDetails = async () => {

         try{
            const replyResponse = await fetch("http://localhost:3001/api/replies");
            const replyResponseData = await replyResponse.json();
            setReply(replyResponseData);
         }
         catch(error){
            console.error("Error fetching replies:", error);
         }
         
      };

      fetchReplyDetails();
   }, []);

  return children(replies);
};

export default RepliesFetcher;