import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home_Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop_Page from "./pages/Shop_Page";
import Product_Page from "./components/Product_Page";
import Footer from "./components/Footer";
import Not_Found from "./pages/Not_Found";
import Counter from "./app/features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import ShoppingBag_Page from "./pages/ShoppingBag_Page";
import AboutMe_Page from "./pages/AboutMe_Page";
import Portfolio_Page from "./pages/Portfolio_Page";
import Admin_Page from "./pages/Admin_Page";
//redux
import { selectUserName } from "./app/features/user/userSlice";
import { useSelector } from "react-redux";

function App() {
  const adminName = useSelector(selectUserName);

  return (
    <div className="App">
      <BrowserRouter>
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
            element={adminName ? <Admin_Page /> : <Not_Found />}
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
      </BrowserRouter>
      {/* <Counter /> */}
      {/* <AddPostForm />
      <PostsList /> */}
    </div>
  );
}

export default App;
