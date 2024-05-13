import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="container">
      <nav className="header_nav">
        <ul>
          <li>
            <Link to="/" className="header_nav_link">
              <span className="header_nav_emoji">&#127968;</span> Strona Główna
            </Link>
          </li>
          <li>
            <Link to="/favourites" className="header_nav_link">
              <span className="header_nav_emoji">&#11088;</span> Ulubione
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
