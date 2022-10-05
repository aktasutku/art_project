import React from "react";
import "./Portrait.css";
import portraitImg from "../../assets/portrait.png";
import LazyLoad from "react-lazy-load";

const Portrait = () => {
  return (
    <div className="portrait">
      <div className="portrait__image">
        <LazyLoad>
          <img src={portraitImg} />
        </LazyLoad>
      </div>
      <div className="portrait__comment">
        <h1>Get your Customized Portrait Today!</h1>
        <h3>
          Show your tribe and join us wherever you are . New lines and designs
          added, golden oldies restocked, and worldwide shipping available now.{" "}
        </h3>
        <button>BUY NOW </button>
      </div>
    </div>
  );
};

export default Portrait;
