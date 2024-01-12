import { Link } from "react-router-dom";
import "./style/headerstyle.css";

const Header = () => {

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("jwt");

    // You might want to redirect the user to the login page or another page after logout
    // Example: window.location.href = "/login";
  };


  return (
    <header className="header">
      <h1 className="logo">Forumify</h1>
      <ul className="nav-list">
        <li><Link to="/subjects" className="navlink">Subjects</Link></li>
        <li><Link to="/" className="navlink" onClick={handleLogout}>Logout</Link></li>
      </ul>
      
      
    </header>
  );

};

export default Header;