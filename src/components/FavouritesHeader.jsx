import { Link } from "react-router-dom";

const FavouritesHeader = () => {
  return (
    <header className="container">
      <div className="header_nav">
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
      </div>
      <h1 className="home_hero_text">&#11088; Ulubione</h1>
    </header>
  );
};

export default FavouritesHeader;
