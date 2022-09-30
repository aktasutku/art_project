import React, { useEffect, useState } from "react";
import "./Footer.css";
//MUI
import CopyrightIcon from "@mui/icons-material/Copyright";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
// Firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, socialLinksCol } from "../firebase";
import { getDoc, doc } from "firebase/firestore/lite";
//Redux
import userSlice from "../app/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserEmail,
  selectUserPhoto,
  setUserSignOut,
  setUserLoginDetails,
} from "../app/features/user/userSlice";
//React Router
import { useNavigate, useLocation } from "react-router-dom";

// const socialLinks = require("../social.json");

const Footer = () => {
  const fontSize = 18;
  const year = new Date().getFullYear();
  // REACT ROUTER
  const navigate = useNavigate();
  const location = useLocation();
  //FIREBASE
  const provider = new GoogleAuthProvider();
  const [socialLinks, setSocialLinks] = useState();
  //REDUX
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  // const userPhoto = useSelector(selectUserPhoto);
  // const userEmail = useSelector(selectUserEmail);

  //fetch data from Firebase for shopItems
  useEffect(() => {
    const getSocialLinks = async () => {
      const docRef = doc(socialLinksCol, "24STOxvBEmCmBezY16LD");
      const fireStoreData = await getDoc(docRef);
      setSocialLinks(fireStoreData.data());
    };
    getSocialLinks();
  }, []);

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
          // dispatch(
          //   setUserLoginDetails({
          //     name: result.user.displayName,
          //     email: result.user.email,
          //     photo: result.user.photoURL,
          //   })
          // );
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
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <footer className="footer">
      <div className="footer__brand">
        <p>ARSTY BUTTERCUP</p>
      </div>
      <p className="footer__division">
        <CloudQueueIcon sx={{ fontSize: `${fontSize}px` }} />
      </p>

      <div className="footer__social">
        <a href={socialLinks?.instagram}>Instagram</a>
        <p className="footer__division">|</p>
        <a href={socialLinks?.tiktok}>Tiktok</a>
        <p className="footer__division">|</p>
        <a href={socialLinks?.youtube}>Youtube</a>
      </div>
      {/* <p className="footer__division">/</p> */}
      <p className="footer__division">
        <CloudQueueIcon sx={{ fontSize: `${fontSize}px` }} />
      </p>

      <div className="footer__copyrights">
        <div>
          <CopyrightIcon />
          <p>
            <span onClick={() => navigate("admin")}>Copy</span> Rights {year}{" "}
            <u onClick={handleAuth}>Utku Aktas</u>
          </p>
        </div>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
