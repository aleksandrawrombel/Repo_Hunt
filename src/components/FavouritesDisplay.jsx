import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavouritesDisplay = () => {
  const [localStorageData, setLocalStorageData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    setLocalStorageData(items);
  }, []);

  return (
    <section className="container favourites_container">
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

export default FavouritesDisplay;
