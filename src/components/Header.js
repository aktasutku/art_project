import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../assets/Logo.png";
// REACT ICONS
import { MdOutlineShoppingBag } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "animate.css";
// Firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase";
// REACT ROUTER
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectAllCartItems } from "../app/features/cartItem/cartItemSlice";
import {
  selectUserName,
  setUserSignOut,
  setUserLoginDetails,
} from "../app/features/user/userSlice";

const Header = () => {
  // REACT ROUTER
  const navigate = useNavigate();
  const location = useLocation();
  //FIREBASE
  const provider = new GoogleAuthProvider();
  //Redux
  const cartItems = useSelector(selectAllCartItems);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  // const userPhoto = useSelector(selectUserPhoto);
  // const userEmail = useSelector(selectUserEmail);

  const [display, setDisplay] = useState(false);
  // className variables
  const activeHeader = ({ isActive }) => (isActive ? "headerActive" : "");
  const ulList = display ? "header__list " : "header__list header__list__none ";
  let totalItemsQty = 0;

  cartItems.map((item) => {
    totalItemsQty += Number(item.qty);
  });

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      })
    );
  };
  //This keeps us logged in on refresh page
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      navigate(location.pathname); // on refresh going to same direction
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setUserSignOut());
          navigate("/home"); // ??? it dosent direct me to home page
          console.log("home");
        })
        .catch((err) => alert(err.message));
    }
  };

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
        <div className="header__bag__signIn">
          {!userName ? (
            <p onClick={handleAuth}>Sign in</p>
          ) : (
            <div className="header__bag__signedIn">
              <p onClick={() => navigate("admin")}>Admin</p>
              <div>|</div>
              <p onClick={handleAuth}>Logout</p>
            </div>
          )}
        </div>
        <div className="header__bag__container">
          <MdOutlineShoppingBag className="header__bag__icon" />
          {totalItemsQty > 0 && (
            <div className="header__bag__number  animate__animated animate__bounce">
              {totalItemsQty}
            </div>
          )}
          <p>
            <NavLink className={activeHeader} to="/shopping-bag">
              Shopping Bag
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
