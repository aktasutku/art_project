import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShopPage from "./pages/ShopPage/ShopPage";
import Product_Page from "./components/Product_Page";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop">
            <Route index element={<ShopPage />} />
            <Route path="product" element={<Product_Page/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
