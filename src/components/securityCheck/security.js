import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const useSecurityVerify = () => {
   const navigate = useNavigate();
 
  useEffect(() => {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        navigate("/");
      } 
      else {
        try {
          // decode the token
          const decodedToken = jwtDecode(token);

          // check for token expiration
          if(decodedToken.exp * 1000 < Date.now()){
            localStorage.removeItem("jwt"); // Remove the expired token
            navigate("/");
          }

        } catch (error) {
          localStorage.removeItem("jwt");
          navigate("/");
        }
      }
      // Adding [navigate] helps React know that the useEffect relies on the 'navigate' function, and it should re-run only whenever navigate changes.
    }, [navigate]
  );
};