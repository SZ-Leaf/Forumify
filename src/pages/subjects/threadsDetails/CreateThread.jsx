// import { useEffect, useState } from "react";
import { useSecurityVerify } from "../../securityCheck/security";

const CreateThread = () => {

   useSecurityVerify();

   const handleCreateThread = async (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      const content = event.target.content.value;

      
   }

}

export default CreateThread;