import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";
import social from "../social.json"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  //Redux
  const count = useSelector((state) => state.counter.count);

  const [display, setDisplay] = useState(false);
  const [shoppingBag, setShoppingBag] = useState(0);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    setShoppingBag(count);
  }, [count]);

  const handleClick = () => {
    setDisplay((display) => !display);
  };

//  social.map(s=>{
//   console.log(s)
//  })

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
          {shoppingBag > 0 && (
            <div className="header__bag__number  animate__animated animate__bounce">
              {shoppingBag}
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
