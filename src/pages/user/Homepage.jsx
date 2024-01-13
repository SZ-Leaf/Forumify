import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {

   const [message, setMessage] = useState(null);
   const token = localStorage.getItem("jwt");
   const navigate = useNavigate();


   const handleLogin = async (event) => {

      event.preventDefault();

      const username = event.target.username.value;
      const password = event.target.password.value;

      const loginData = {
         username,
         password,
      };

      const loginDataJson = JSON.stringify(loginData);

      const loginResponse = await fetch('http://localhost:3001/api/users/login', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: loginDataJson
      });

      const loginResponseData = await loginResponse.json();
      const token = loginResponseData.data;

      if (token) {
         localStorage.setItem("jwt", token);
         setMessage("Login Succesfull");
         navigate("/subjects");
      } else {
         if(!username){
            setMessage("Please enter your username");
         } else if(!password){
            setMessage("Please enter your password");
         } else {
            setMessage("Incorrect credentials");
         }
      }
   
   }

   useEffect(() => {
      if (token) {
        navigate("/subjects");
      }
   });

   return (
      <>
         {message && <p>{message}</p>}
         <h1>Welcome to Forumify</h1>
         <form onSubmit={handleLogin}>
        <label>
          username
          <input type="text" name="username" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <input type="submit" />
      </form>
      </>
   );
};

export default HomePage;