import React from "react";
import Header from "../user/Header";
import AdminHeader from "./AdminHeader";
import { jwtDecode } from "jwt-decode";

// Function to decide which header to render based on the RoleId
const RoleHeader = ({ token }) => {
   // Function to decode user ID and RoleId from JWT token
   const getLoggedInUserDetails = () => {
      if (token) {
         const decodedToken = jwtDecode(token);
         return {
         roleId: decodedToken.RoleId,
         };
      }
      return null;
   };

   const loggedInUserDetails = getLoggedInUserDetails();

   return loggedInUserDetails?.roleId === 1 ? (
      // Render AdminHeader if RoleId is 1
      <AdminHeader />
   ) : (
      // Render normal Header if RoleId is not 1
      <Header />
   );
};

export default RoleHeader;