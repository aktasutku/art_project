import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import Product_Page from "./components/Product_Page";
import Footer from "./components/Footer";
import Not_Found from "./pages/Not_Found";
import Counter from "./app/features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import ShoppingBagPage from "./pages/ShoppingBagPage";
import AboutMe_Page from "./pages/AboutMe_Page";
// import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop">
            <Route index element={<ShopPage />} />
            <Route path="product/:id" element={<Product_Page />} />
          </Route>
          <Route path="/shopping-bag" element={<ShoppingBagPage />} />
          <Route path="/about-me" element={<AboutMe_Page />} />

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
