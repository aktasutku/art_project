import React from "react";
import Wall from "../Wall";
import Portrait from "..//Portrait";
import Recent from "..//Recent";
import Subscribe from "../components/Subscribe";
import Shop from "../Shop";
import Carousel from "../Carousel";

const Home = () => {
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
