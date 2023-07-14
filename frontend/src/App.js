import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing_Page/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import Cart from "./components/Cart/Cart";
import { Profile } from "./components/ProfilePage/Profile";
import { Checkout } from "./components/CheckoutCart/Checkout";
import { OrderDetails } from "./components/OrderDetails/OrderDetails";
import baseUrl from "./components/Constant";
import axios from "axios";
function App() {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/loginStatus`);
        let status = response.data === true ? "true" : "false";
        console.log("App Load status " + status);
        localStorage.setItem("isLoggedIn", status);
      } catch (error) {
        console.log("error in fecthing login status ", error);
      }
    };

    checkLoginStatus();
  }, []);
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
