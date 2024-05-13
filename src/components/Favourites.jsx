import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    setLocalStorageData(items);
  }, []);

  return (
    <section className="container favourites_container">
      <h1 className="home_hero_text">&#11088; Ulubione</h1>
      <ul>
        {localStorageData.map((item, index) => {
          return (
            <Link key={index}>
              <li className="favourites_link">{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Favourites;
