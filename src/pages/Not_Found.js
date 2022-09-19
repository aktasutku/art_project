import React from "react";
import "./Not_Found.css";
import notFound from "../assets/404.jpg"

const Not_Found = () => {
  return (
    <div className="notFound">
      <img src={notFound} alt="" />
      <div className="notFound__desc">
        <p>404</p>
        <p>Not Found</p>
        <p>The resource requested could not be found on this server!</p>
      </div>
    </div>
  );
};

export default Not_Found;
