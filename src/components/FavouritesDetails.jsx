import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FavouritesDetails = () => {
  const { id } = useParams();
  let idNumber = parseInt(id.slice(1));

  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [favourite, setFavourite] = useState(null);

  useEffect(() => {
    const selectedFavourite = localStorageData.find(
      (item) => item.id === idNumber
    );
    setFavourite(selectedFavourite);
  }, [idNumber, localStorageData]);

  if (!favourite) {
    return (
      <section className="container favourites_details_container favourites_details_loading">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="container favourites_details_container">
        <h1 className="favourites_details_name">
          {favourite.name}{" "}
          <span className="favourites_details_owner">{`by ${favourite.owner.login}`}</span>{" "}
          <img
            src={favourite.owner.avatar_url}
            alt="avatar"
            className="favourites_details_avatar"
          />
        </h1>
        <p className="favourites_details_description">
          {favourite.description}
        </p>
        <p className="favourites_details_url">
          &#128279; {""}
          <a href={favourite.svn_url} target="_blank">
            URL
          </a>
        </p>
        <p>&#11088; {favourite.stargazers_count}</p>
        <p>&#127874; {new Date(favourite.created_at).toLocaleDateString()}</p>
      </section>
    </>
  );
};

export default FavouritesDetails;
