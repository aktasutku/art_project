import React, { useEffect } from "react";
import Wall from "../components/Home/Wall";
import Portrait from "../components/Home/Portrait";
import Recent from "../components/Home/Recent";
import Subscribe from "../components/Subscribe";
import Shop from "../components/Home/Shop";
import Carousel from "../components/Home/Carousel";
import LazyLoad from "react-lazy-load";

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
