import { Link } from "react-router-dom";
import "./style/headerstyle.css";
import { jwtDecode } from "jwt-decode";

const Header = () => {

  const token = localStorage.getItem("jwt");
  // console.log(token);

  if(!token || !jwtDecode(token)){
    return
  }
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
      <Link to="/subjects" className="logolink"><h1 className="logo">Forumify</h1></Link>
      {/* <ul className="nav-list">

        <li id="profile">
          <Link to="/users/profile" className="navlink">{username}</Link><span></span><span></span><span></span><span></span>
        </li>

        <li id="subjects">
          <Link to="/subjects" className="navlink">Subjects</Link><span></span><span></span><span></span><span></span>
        </li>

        <li id="logout">
          <Link to="/" className="navlink" onClick={handleLogout}>Logout</Link><span></span><span></span><span></span><span></span>
        </li>

      </ul> */}
      <nav>
        <ul>

          <li>
          <Link to="/users/profile" className="navlink">{username}</Link>
          <span></span><span></span><span></span><span></span>
          </li>

          <li>
          <Link to="/subjects" className="navlink">Subjects</Link>
            <span></span><span></span><span></span><span></span>
          </li>

          <li>
          <Link to="/" className="navlink" id="logout" onClick={handleLogout}>Logout</Link>
            <span></span><span></span><span></span><span></span>
          </li>

        </ul>
      </nav>
    </header>
  );

};

export default Header;