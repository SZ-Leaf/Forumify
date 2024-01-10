import { Link } from "react-router-dom";
import './headerstyle/headerstyle.css'

const Header = () => {
  return (
    <header className="header">
      <h1>Forumify</h1>
      <Link to="/" className="logoutlink"><h1>Logout</h1></Link>
    </header>
  );
};

export default Header;