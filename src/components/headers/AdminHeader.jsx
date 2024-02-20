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
         <Link to="/subjects" className="logolink"><h1 className="logo">e-WoW Community</h1></Link>
         <nav>
            <ul className="nav-list">

            <li>
            <Link to="/users/profile" className="navlink">{username}</Link>
            <span></span><span></span><span></span><span></span>
            </li>

            <li>
            <Link to="/subjects" className="navlink">Subjects</Link>
               <span></span><span></span><span></span><span></span>
            </li>

            <li id="dashboard">
            <Link to="/dashboard" className="navlink">Dashboard</Link>
               <span></span><span></span><span></span><span></span>
            </li>

            <li className="logout">
            <Link to="/" className="navlink" id="logout" onClick={handleLogout}>Logout</Link>
               <span></span><span></span><span></span><span></span>
            </li>
            
            </ul>
         </nav>
      </header>
   );
};

export default AdminHeader;