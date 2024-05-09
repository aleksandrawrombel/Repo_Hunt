const HomeSearchDisplay = () => {
  return (
    <main className="container">
      <section className="search_container">
        <input className="search_bar" type="text" />
        <button className="search_button">
          <span className="search_emoji">&#128269;</span> Szukaj
        </button>
      </section>
    </main>
  );
};

export default HomeSearchDisplay;
