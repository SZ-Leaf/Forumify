import { Link } from "react-router-dom";

const AdminHeader = () => {

   const handleLogout = () => {
      // Remove the JWT token from local storage
      localStorage.removeItem("jwt");

      // You might want to redirect the user to the login page or another page after logout
      // Example: window.location.href = "/login";
   };


   return (
      <header className="header">
         <h1>Forumify</h1>
         <Link to="/dashboard" className="dashboard-link"><h1>Dashboard</h1></Link>
         <Link to="/" className="logoutlink" onClick={handleLogout}><h1>Logout</h1></Link>
      </header>
   );

};

export default AdminHeader;