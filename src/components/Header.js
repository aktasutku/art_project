import React, { useState } from "react";
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

  return (
    <div className="header">
      <div className="header__img">
        <img src={Logo} />
      </div>
      <div className="header__menu " onClick={() => setDisplay(() => !display)}>
        <AiOutlineMenu />
      </div>
      <div
        className={
          display ? "header__list " : "header__list header__list__none "
        }
      >
        <ul className="animate__animated animate__fadeInLeft">
          <NavLink activeclassname="headerActive" to="art_project">
            <li onClick={() => setDisplay(false)}>Home</li>
          </NavLink>
          <NavLink activeclassname="headerActive" to="shop">
            <li onClick={() => setDisplay(false)}>Shop</li>
          </NavLink>
          <NavLink activeclassname="headerActive" to="customized-portrait">
            <li onClick={() => setDisplay(false)}>Customized Portrait</li>
          </NavLink>
          <NavLink activeclassname="headerActive" to="portfolio">
            <li onClick={() => setDisplay(false)}>Portfolio</li>
          </NavLink>
          <NavLink activeclassname="headerActive" to="about-me">
            <li onClick={() => setDisplay(false)}>About Me</li>
          </NavLink>
          <NavLink activeclassname="headerActive" to="behind-the-scenes">
            <li onClick={() => setDisplay(false)}>Behind the Scenes</li>
          </NavLink>
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
          <NavLink activeclassname="active" to="/shopping-bag">
            Shopping Bag
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Header;
