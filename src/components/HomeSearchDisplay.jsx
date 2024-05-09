import { useState } from "react";

const HomeSearchDisplay = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);

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
        <button className="search_button" onClick={handleSearch}>
          <span className="search_emoji">&#128269;</span> Szukaj
        </button>
      </section>
      <div className="page_status">Strona 1 z 6</div>
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
          <tbody>
            {searchResults.slice(0, resultsPerPage).map((result, index) => (
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
        </table>
      </section>
      <section className="pagination_container">
        <div className="pagination">
          <label htmlFor="resultsPerPage">Wyników na stronę:</label>
          <select
            id="resultsPerPage"
            value={resultsPerPage}
            onChange={(e) => setResultsPerPage(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="pagination_buttons">
          <button>Poprzednia</button>
          <button>Następna</button>
        </div>
      </section>
    </main>
  );
};

export default HomeSearchDisplay;
