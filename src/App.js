import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home_Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop_Page from "./pages/Shop_Page";
import Product_Page from "./pages/Product_Page";
import Footer from "./components/Footer";
import Not_Found from "./pages/Not_Found";
import ShoppingBag_Page from "./pages/ShoppingBag_Page";
import AboutMe_Page from "./pages/AboutMe_Page";
import Portfolio_Page from "./pages/Portfolio_Page";
import Admin_Page from "./pages/Admin_Page";
//redux
import { selectUserName, selectAdmin } from "./app/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ActiveAddDeleteEditProvider from "./app/Context/AddEditDeleteActiveCxt";
import SelectedItemProvider from "./app/Context/selectedItemCtx";
import { useEffect } from "react";
import { fetchCartData, sendCartData } from "./app/cart-actions";

//when page load first time avoid cart data sending
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
  // const adminName = useSelector(selectUserName);
  const cart = useSelector((state) => state.cartItems);

  // FETCH CART DATA
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // SEND CART DATA
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div className="App">
      <ActiveAddDeleteEditProvider>
        <SelectedItemProvider>
          <Header />

          <Routes>
            {/* Clieant Side */}
            <Route path="/art_project" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop">
              <Route index element={<Shop_Page />} />
              <Route path="product/:id" element={<Product_Page />} />
            </Route>
            <Route path="/portfolio" element={<Portfolio_Page />} />
            <Route path="/about-me" element={<AboutMe_Page />} />
            <Route path="/shopping-bag" element={<ShoppingBag_Page />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={admin ? <Admin_Page /> : <Not_Found />}
            >
              <Route path="home" element={<Admin_Page />} />
              <Route path="shop" element={<Admin_Page />} />
              <Route path="portfolio" element={<Admin_Page />} />
              <Route path="about-me" element={<Admin_Page />} />
              <Route path="behind-the-scenes" element={<Admin_Page />} />
            </Route>

            <Route path="*" element={<Not_Found />} />
          </Routes>

          <Footer />
        </SelectedItemProvider>
      </ActiveAddDeleteEditProvider>
    </div>
  );
}

export default App;
