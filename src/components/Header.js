import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import ShopPage from "../pages/ShopPage/ShopPage";
import Product_Card from "../pages/ShopPage/Product_Card";

const Header = () => {
  const [display, setDisplay] = useState(false);
  const [shoppingBag, setShoppingBag] = useState(0);

  const handleClick = () => {
    setDisplay((display) => !display);
  };

  return (
      <div className="header">
        <div className="header__img">
          <img src={Logo} />
        </div>
        <div className="header__menu " onClick={() => handleClick()}>
          <AiOutlineMenu />
        </div>
        <div
          className={
            display ? "header__list " : "header__list header__list__none "
          }
        >
          <ul className="animate__animated animate__fadeInDown">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/customized-portrait">Customized Portrait</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about-me">About Me</Link>
            </li>
            <li>
              <Link to="/behind-the-scenes">Behind the Scenes</Link>
            </li>
          </ul>
        </div>
        <div className="header__bag">
          <div className="header__bag__container">
            <MdOutlineShoppingBag className="header__bag__icon" />
            <div className="header__bag__number  animate__animated animate__bounce">
              {shoppingBag}
            </div>
          </div>
          <p>
            <a href="#">
              <Link to="/shopping-bag">Shopping Bag</Link>
            </a>
          </p>
        </div>
      </div>


  );
};

export default Header;
