import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
