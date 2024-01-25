import React from "react";
import { Link } from "react-router-dom";
import './subjectpagestyle/subjectstyle.css'
import { useSecurityVerify } from "../../components/securityCheck/security";
import RoleHeader from "../../components/headers/RoleHeaderCheck";
// import { jwtDecode } from "jwt-decode";
import PVE from '../../Assets/pve.png'
import PVP from '../../Assets/pvp.png'
import Raid from '../../Assets/raid.png'

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

      <RoleHeader className="header" token={token} />
         
         <section className="subjectbody">

            <div className="main-subject-div">

               <div className="title">Subjects</div>

               <div className="linksDiv">

                  <Link to="/pve" className="subject-div">
                     <div className="subjectTitle">PvE</div>
                     <div className="subjectImg"><img src={PVE} alt="PvE" /></div>
                  </Link>

                  <Link to="/pvp" className="subject-div">
                     <div className="subjectTitle">PvP</div>
                     <div className="subjectImg"><img src={PVP} alt="PvP" /></div>
                  </Link>

                  <Link to="/raid" className="subject-div">
                     <div className="subjectTitle">Raid</div>
                     <div className="subjectImg"><img src={Raid} alt="Raid" /></div>
                  </Link>

               </div>

            </div>

         </section>
      </div>
   )
}

export default SubjectPage;