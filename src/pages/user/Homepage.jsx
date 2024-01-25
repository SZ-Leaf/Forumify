import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './homepagestyle/homeStyle.css'

const HomePage = () => {

   const [message, setMessage] = useState(null);
   const token = localStorage.getItem("jwt");
   const navigate = useNavigate();
   const [isRegistered, setIsRegistered] = useState(false);
   
   useEffect(() => {
      if (token && !isRegistered) {
         navigate("/subjects");
      }
   }, [token, isRegistered, navigate]);

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

   const handleRegister = async (event) => {
      event.preventDefault();

      const username = event.target.username.value;
      const password = event.target.password.value;

      const registerData = {
         username,
         password,
      };

      const registerDataJson = JSON.stringify(registerData);

      const registerResponse = await fetch('http://localhost:3001/api/users/', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: registerDataJson
      });

      const registerResponseData = await registerResponse.json();
      const token = registerResponseData.data;

      if (registerResponse.status === 400) {
         setMessage("Existing Credentials.");
      } 
      // else {
      //    setMessage("Error Creating Thread.");
      // }

      if (token) {
         localStorage.setItem("jwt", token);
         setMessage("Register Succesfull, please login");
         setIsRegistered(true);
      } else {
         if(!username){
            setMessage("Please enter your username");
         } else if(!password){
            setMessage("Please enter your password");
         }
      }
   }

   const handleSubmit = (event) => {
      const clickedButtonName = event.nativeEvent.submitter.name;

      if (clickedButtonName === 'login') {
         handleLogin(event);
      } else if (clickedButtonName === 'register') {
         handleRegister(event);
      }
   };

   return (
      <div className="homeMain">
         <h1 className="homeTitle">Welcome to Forumify</h1>
         {message && <p className="loginVerify">{message}</p>}
         <form onSubmit={handleSubmit}>

            <label>

               <p>Username</p>
               
               <input type="text" maxLength={25} name="username" />
            </label>

            <label>
               
               <p>Password</p>
               
               <input type="password" maxLength={25} name="password" />
            </label>

            <input className="loginButtons" type="submit" name="login" value="Login" />
            <input className="loginButtons" type="submit" name="register" value="Register" />
         </form>
      </div>
   );
};

export default HomePage;