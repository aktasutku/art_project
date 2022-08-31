import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";

const Header = () => {
  const [display, setDisplay] = useState(false);
  const [shoppingBag, setShoppingBag] = useState(0);

  const handleClick = () => {
    setDisplay((display) => !display);
  };

  return (
    <div
      className="header"

    >
      <div className="header__img">
        <img src={Logo} />
      </div>
      <div className="header__menu " onClick={() => handleClick()}>
        <AiOutlineMenu />
      </div>
      <div
        className={
          display ? "header__list " : "header__list header__list__none"
        }
      >
        <ul className="animate__animated animate__fadeInDown">
          <li >Home</li>
          <li>Shop</li>
          <li>Customized Portrait</li>
          <li>Portfolio</li>
          <li>About Me</li>
          <li>Behind the Scenes</li>
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
          <a href="#">Shopping Bag</a>
        </p>
      </div>
    </div>
  );
};

export default Header;
