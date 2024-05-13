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
      <section className="container favourites_details_container">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="container favourites_details_container">
        <h1>
          {`${favourite.name} by `} <span>{favourite.owner.login}</span>{" "}
          <img src={favourite.owner.avatar_url} alt="avatar" />
        </h1>
        <p>{favourite.description}</p>
        <p>
          <a href={favourite.svn_url} target="_blank" className="name_link">
            URL
          </a>
        </p>
        <p>{idNumber}</p>
        <p>{new Date(favourite.created_at).toLocaleDateString()}</p>
      </section>
    </>
  );
};

export default FavouritesDetails;
