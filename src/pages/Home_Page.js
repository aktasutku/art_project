import React, { useEffect } from "react";
import Wall from "./Home/Wall";
import Portrait from "./Home/Portrait";
import Recent from "./Home/Recent";
import Subscribe from "../components/Subscribe";
import Shop from "./Home/Shop";
import Carousel from "./Home/Carousel";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Carousel />
      <Shop />
      <Wall />
      <Portrait />
      <Recent />
      <Subscribe />
    </>
  );
};

export default Home;
