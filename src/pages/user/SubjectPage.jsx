import React from "react";
import { Link } from "react-router-dom";
import './subjectpagestyle/subjectstyle.css'
import { useSecurityVerify } from "../securityCheck/security";
import RoleHeader from "../../components/headers/RoleHeaderCheck";
// import { jwtDecode } from "jwt-decode";

const SubjectPage = () => {

   useSecurityVerify();

   const token = localStorage.getItem("jwt");
   
   // const getLoggedInUserDetails = () => {
   //    if (token) {
   //      const decodedToken = jwtDecode(token);
   //      return {
   //       //  userId: decodedToken.UserId,
   //        roleId: decodedToken.RoleId,
   //      };
   //    }
   //    return null;
   // }

   // const loggedInUserDetails = getLoggedInUserDetails();

   return(
      <div className="body">

      <RoleHeader token={token} />
         
         <section className="subjectbody">

            <div className="main-subject-div">
               <div className="title">Subjects</div>

               <Link to="/sports" className="subject-div">
                  <div><h3>Sports</h3></div>
                  <div id="subjectdiv"></div>
               </Link>

               <Link to="/gaming" className="subject-div">
                  <div><h3>Gaming</h3></div>
                  <div id="subjectdiv"></div>
               </Link>

               <Link to="/movies" className="subject-div">
                  <div><h3>Movies</h3></div>
                  <div id="subjectdiv"></div>
               </Link>

            </div>

         </section>
      </div>
   )
}

export default SubjectPage;