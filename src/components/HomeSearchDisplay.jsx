import { useState } from "react";

const HomeSearchDisplay = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data.items);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchButton = () => {
    setCurrentPage(1);
    handleSearch();
  };

  const allPages = Math.ceil(searchResults.length / resultsPerPage);
  const start = (currentPage - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const currentResults = searchResults.slice(start, end);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="container">
      <section className="search_container">
        <input
          className="search_bar"
          placeholder="Nazwa repozytorium"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
              <th>ID</th>
              <th>Nazwa repozytorium</th>
              <th>Właściciel</th>
              <th>Ilość gwiazdek</th>
              <th>Data utworzenia</th>
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
                  <td>{result.id}</td>
                  <td>
                    <a href={result.url} target="_blank" className="name_link">
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
                  <td>{new Date(result.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="favourites_button">
                      Dodaj do ulubionych
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
          <label htmlFor="resultsPerPage">Wyników na stronę:</label>
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
          >
            Poprzednia
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === allPages || allPages === 0}
          >
            Następna
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomeSearchDisplay;
