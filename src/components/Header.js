import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllCartItems } from "../app/features/cartItem/cartItemSlice";

const Header = () => {
  //Redux
  const cartItems = useSelector(selectAllCartItems);
  const [display, setDisplay] = useState(false);
  let totalItemsQty = 0;

  cartItems.map((item) => {
    totalItemsQty += Number(item.qty);
  });

  // this was belong to <AiOutlineMenu />'s div onclick
  // const handleClick = () => {
  //   setDisplay((display) => !display);
  // };

  return (
    <div className="header">
      <div className="header__img">
        <img src={Logo} />
      </div>
      <div
        className="header__menu "
        onClick={() => setDisplay((display) => !display)}
      >
        <AiOutlineMenu />
      </div>
      <div
        className={
          display ? "header__list " : "header__list header__list__none "
        }
      >
        <ul className="animate__animated animate__fadeInLeft">
          <li>
            <NavLink activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="shop">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="customized-portrait">
              Customized Portrait
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="portfolio">
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="about-me">
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="behind-the-scenes">
              Behind the Scenes
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="header__bag">
        <div className="header__bag__container">
          <MdOutlineShoppingBag className="header__bag__icon" />
          {totalItemsQty > 0 && (
            <div className="header__bag__number  animate__animated animate__bounce">
              {totalItemsQty}
            </div>
          )}
        </div>
        <p>
          <NavLink activeClassName="active" to="/shopping-bag">
            Shopping Bag
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Header;
