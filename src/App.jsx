import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import FavouritesDetails from "./components/FavouritesDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/favourites/:id" element={<FavouritesDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
