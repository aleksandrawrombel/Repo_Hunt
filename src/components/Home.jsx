import { useEffect, useState } from "react";

const Home = () => {
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [searchResults, setSearchResults] = useState(
    JSON.parse(localStorage.getItem("searchResults")) || []
  );

  const [cache, setCache] = useState(
    JSON.parse(localStorage.getItem("cache")) || {
      queries: {},
    }
  );

  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({});

  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [addedFavourite, setAddedFavourite] = useState(
    JSON.parse(localStorage.getItem("addedFavourite")) || {}
  );

  // fetching data

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data.items);

      handleCache(query, data.items);
      // console.log("API req sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchButton = () => {
    setCurrentPage(1);

    const cachedQueries = Object.keys(cache.queries);
    if (cachedQueries.includes(query)) {
      const searchedQuery = cache.queries[query];
      setSearchResults(searchedQuery);
    } else {
      handleSearch();
    }
  };

  // table sorting

  const handleSorting = (key) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortingDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction;
    }
  };

  const sortedElements = () => {
    let sortableElements = [...searchResults];

    if (sortConfig !== null) {
      sortableElements.sort((a, b) => {

        // sorting for owner.login property
        if (sortConfig.key === "owner.login") {
          const aLogin = a.owner.login;
          const BLogin = b.owner.login;

          if (aLogin.toLowerCase() < BLogin.toLowerCase()) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aLogin.toLowerCase() > BLogin.toLowerCase()) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }

          // sorting for string properties
        } else if (
          typeof a[sortConfig.key] === "string" ||
          typeof b[sortConfig.key] === "string"
        ) {
          if (
            a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()
          ) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (
            a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()
          ) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }

          // sorting for the rest of properties
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
      });
    }
    return sortableElements;
  };

  // pagination logic

  const allPages = Math.ceil(searchResults.length / resultsPerPage);
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const currentResults = sortedElements().slice(start, end);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // localStorage

  const addToLocalStorage = (favourite) => {
    const updatedFavourites = [...favourites, favourite];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

    const updatedAddedFavourites = { ...addedFavourite, [favourite.id]: true };
    setAddedFavourite(updatedAddedFavourites);
    localStorage.setItem(
      "addedFavourite",
      JSON.stringify(updatedAddedFavourites)
    );
  };

  useEffect(() => {
    localStorage.setItem("query", query);
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
    localStorage.setItem("favourites", JSON.stringify(favourites));
    localStorage.setItem("addedFavourite", JSON.stringify(addedFavourite));

    localStorage.setItem("cache", JSON.stringify(cache));
  }, [favourites, searchResults, query, addedFavourite, cache]);

  // clear localStorage

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // simple cache

  const handleCache = (newQuery, newSearchResult) => {
    const updatedCache = {
      ...cache,
      queries: { ...cache.queries, [newQuery]: newSearchResult },
    };

    setCache(updatedCache);
    localStorage.setItem("cache", JSON.stringify(updatedCache));
  };

  return (
    <main className="container">
      <h1 className="home_hero_text">&#127968; Strona Główna</h1>
      <section className="search_container">
        <input
          className="search_bar"
          placeholder="Nazwa repozytorium"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchButton();
            }
          }}
        />
        <button className="search_button" onClick={handleSearchButton}>
          <span className="search_emoji">&#128269;</span> Szukaj
        </button>
      </section>
      <div className="page_status">
        {allPages === 0
          ? `Strona ${currentPage} z -`
          : `Strona ${currentPage} z ${allPages}`}
      </div>
      <section className="results_container">
        <table className="results_table">
          <thead>
            <tr>
              <th className="th_id">
                ID
                {searchResults.length > 0 && (
                  <span
                    onClick={() => handleSorting("id")}
                    className={
                      getSortingDirection("id") === "ascending"
                        ? "sorting_arrow_up"
                        : "sorting_arrow_down"
                    }
                  ></span>
                )}
              </th>
              <th>
                Nazwa repozytorium
                {searchResults.length > 0 && (
                  <span
                    onClick={() => handleSorting("name")}
                    className={
                      getSortingDirection("name") === "ascending"
                        ? "sorting_arrow_up"
                        : "sorting_arrow_down"
                    }
                  ></span>
                )}
              </th>
              <th>
                Właściciel
                {searchResults.length > 0 && (
                  <span
                    onClick={() => handleSorting("owner.login")}
                    className={
                      getSortingDirection("owner.login") === "ascending"
                        ? "sorting_arrow_up"
                        : "sorting_arrow_down"
                    }
                  ></span>
                )}
              </th>
              <th>
                Ilość gwiazdek
                {searchResults.length > 0 && (
                  <span
                    onClick={() => handleSorting("stargazers_count")}
                    className={
                      getSortingDirection("stargazers_count") === "ascending"
                        ? "sorting_arrow_up"
                        : "sorting_arrow_down"
                    }
                  ></span>
                )}
              </th>
              <th className="th_created_at">
                Data utworzenia
                {searchResults.length > 0 && (
                  <span
                    onClick={() => handleSorting("created_at")}
                    className={
                      getSortingDirection("created_at") === "ascending"
                        ? "sorting_arrow_up"
                        : "sorting_arrow_down"
                    }
                  ></span>
                )}
              </th>
              <th>Ulubione</th>
            </tr>
          </thead>
          {allPages === 0 ? (
            <tbody>
              <tr>
                <td colSpan="6" className="no_results">
                  Brak wyników wyszukiwania
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentResults.map((result, index) => (
                <tr key={index}>
                  <td className="td_id">{result.id}</td>
                  <td>
                    <a
                      href={result.svn_url}
                      target="_blank"
                      className="name_link"
                    >
                      {result.name}
                    </a>
                  </td>
                  <td>
                    <div className="owner">
                      <img
                        src={result.owner.avatar_url}
                        alt="avatar"
                        className="avatar_owner"
                      />
                      <span>{result.owner.login}</span>
                    </div>
                  </td>
                  <td>{result.stargazers_count}</td>
                  <td className="td_created_at">
                    {new Date(result.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className={
                        addedFavourite[result.id]
                          ? "favourites_button_added"
                          : "favourites_button"
                      }
                      onClick={() => addToLocalStorage(result)}
                      disabled={addedFavourite[result.id]}
                    >
                      {addedFavourite[result.id]
                        ? "Dodano do ulubionych"
                        : "Dodaj do ulubionych"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </section>
      <section className="pagination_container">
        <div className="pagination">
          <label htmlFor="resultsPerPage" className="results_per_page">
            Wyników na stronę:
          </label>
          <select
            id="resultsPerPage"
            value={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="pagination_buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "pagination_button_disabled" : ""}
          >
            Poprzednia
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === allPages || allPages === 0}
            className={
              currentPage === allPages || allPages === 0
                ? "pagination_button_disabled"
                : ""
            }
          >
            Następna
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
