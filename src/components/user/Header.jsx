import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>King of Coworkings</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/coworkings">Coworkings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;