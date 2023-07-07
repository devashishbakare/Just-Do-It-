import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing_Page/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import Cart from "./components/Cart/Cart";
import { Profile } from "./components/ProfilePage/Profile";
function App() {
  localStorage.setItem("isLoggedIn", "false");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
