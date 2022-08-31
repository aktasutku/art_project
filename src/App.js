import "./App.css";
import Shop from "./Shop";
import Carousel from "./Carousel";
import Header from "./components/Header";
import Wall from "./Wall";
import Portrait from "./Portrait";  
import Recent from "./Recent";
import Subscribe from "./components/Subscribe";
import ShopPage from "./ShopPage/ShopPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Carousel />
      <Shop />
      <Wall />
      <Portrait />
      <Recent />
      {/* <ShopPage/>
      <Subscribe /> */}
    </div>
  );
}

export default App;
