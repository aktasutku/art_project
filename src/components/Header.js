import React, { useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";

import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllCartItems } from "../app/features/cartItem/cartItemSlice";

const Header = () => {
  //Redux
  const cartItems = useSelector(selectAllCartItems);
  const [display, setDisplay] = useState(false);
  // className variables
  const activeHeader = ({ isActive }) => (isActive ? "headerActive" : "");
  const ulList = display ? "header__list " : "header__list header__list__none ";
  let totalItemsQty = 0;

  cartItems.map((item) => {
    totalItemsQty += Number(item.qty);
  });

  return (
    <div className="header">
      <Link to="/">
        <div className="header__img">
          <img src={Logo} />
        </div>
      </Link>
      <div className="header__menu " onClick={() => setDisplay(() => !display)}>
        <AiOutlineMenu />
      </div>
      <div className={ulList}>
        <ul className="animate__animated animate__fadeInLeft">
          <NavLink to="art_project" className={activeHeader}>
            <li onClick={() => setDisplay(false)}>Home</li>
          </NavLink>
          <NavLink to="shop" className={activeHeader}>
            <li onClick={() => setDisplay(false)}>Shop</li>
          </NavLink>
          <NavLink to="customized-portrait" className={activeHeader}>
            <li onClick={() => setDisplay(false)}>Customized Portrait</li>
          </NavLink>
          <NavLink to="portfolio" className={activeHeader}>
            <li onClick={() => setDisplay(false)}>Portfolio</li>
          </NavLink>
          <NavLink to="about-me" className={activeHeader}>
            <li onClick={() => setDisplay(false)}>About Me</li>
          </NavLink>
          <NavLink to="behind-the-scenes" className={activeHeader}>
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
          <NavLink className={activeHeader} to="/shopping-bag">
            Shopping Bag
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Header;
