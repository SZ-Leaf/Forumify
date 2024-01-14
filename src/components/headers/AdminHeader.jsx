import { Link } from "react-router-dom";
import "./style/headerstyle.css";
import { jwtDecode } from "jwt-decode";

const AdminHeader = () => {

   const token = localStorage.getItem("jwt");
   const decodedToken = jwtDecode(token)

   const username = decodedToken.data;

   const handleLogout = () => {
      // Remove the JWT token from local storage
      localStorage.removeItem("jwt");

      // You might want to redirect the user to the login page or another page after logout
      // Example: window.location.href = "/login";
   };


   return (
      <header className="header">
         <h1 className="logo">Forumify</h1>
         {/* <Link to="/dashboard" className="dashboard-link"><h1>Dashboard</h1></Link><Link to="/" className="subjectslink"><h2>Subjects</h2></Link>
         <Link to="/dashboard" className="dashboard-link"><h2>Dashboard</h2></Link>
         <Link to="/" className="logoutlink" onClick={handleLogout}><h1>Logout</h1></Link> */}
         <ul className="nav-list">
            <li><Link to="/users/profile" className="navlink">{username}</Link></li>
            <li><Link to="/subjects" className="navlink">Subjects</Link></li>
            <li><Link to="/dashboard" className="navlink">Dashboard</Link></li>
            <li><Link to="/" className="navlink" onClick={handleLogout}>Logout</Link></li>
         </ul>
      </header>
   );

};

export default AdminHeader;