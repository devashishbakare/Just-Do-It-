import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Landing_Page/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
