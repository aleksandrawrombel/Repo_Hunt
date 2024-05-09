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
      <section className="results_container">
        
      </section>
    </main>
  );
};

export default HomeSearchDisplay;
