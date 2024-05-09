import { useState } from "react";

const HomeSearchDisplay = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data);
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
          placeholder="Search..."
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
            <tr>
              <td>12345678</td>
              <td>link</td>
              <td>icon text</td>
              <td>stars</td>
              <td>date</td>
              <td>
                <button className="favourites_button">
                  Dodaj do ulubionych
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default HomeSearchDisplay;
