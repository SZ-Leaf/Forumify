// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import Header from "./Header";
import './subjectpagestyle/subjectstyle.css'
import { useSecurityVerify } from "../securityCheck/security";

const SubjectPage = () => {

   useSecurityVerify();

   return(
      <div className="body">
         <Header />
         
         <section className="subjectbody">

            <div className="main-subject-div">
               <div className="title">Subjects</div>

               <div className="subject-div">
                  <div><h3>Sports</h3></div>
                  <div id="subjectdiv1"></div>
               </div>

               <div className="subject-div">
                  <div><h3>Gaming</h3></div>
                  <div id="subjectdiv2"></div>
               </div>

               <div className="subject-div">
                  <div><h3>Movies</h3></div>
                  <div id="subjectdiv2"></div>
               </div>

            </div>

         </section>
      </div>
   )
}

export default SubjectPage;