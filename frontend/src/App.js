import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing_Page/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import Cart from "./components/Cart/Cart";
import { Profile } from "./components/ProfilePage/Profile";
import { Checkout } from "./components/CheckoutCart/Checkout";
import { OrderDetails } from "./components/OrderDetails/OrderDetails";
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
