import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing_Page/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import Cart from "./components/Cart/Cart";
import { Profile } from "./components/ProfilePage/Profile";
import { Authenticate } from "./components/Authenticate";
function App() {
  localStorage.setItem("isLoggedIn", "false");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkAuth/favorite" element={<FavoritePage />} />
          <Route path="/checkAuth/cart" element={<Cart />} />
          <Route path="/checkAuth/profile" element={<Profile />} />
          <Route path="/checkAuth" element={<Authenticate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
