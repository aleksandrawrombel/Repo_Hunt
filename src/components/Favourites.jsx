import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    setLocalStorageData(favourites);
  }, []);

  return (
    <section className="container favourites_container">
      <h1 className="home_hero_text">&#11088; Ulubione</h1>
      <ul>
        {localStorageData.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/favourites/:${item.id}`}
            >
              <li className="favourites_link">{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Favourites;
