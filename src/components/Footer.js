import React, { useEffect, useState } from "react";
import "./Footer.css";
//MUI
import CopyrightIcon from "@mui/icons-material/Copyright";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
// Firebase
import { auth, socialLinksCol } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
// const socialLinks = require("../social.json");

const Footer = () => {
  const fontSize = 18;
  const year = new Date().getFullYear();

  //FIREBASE
  const [socialLinks, setSocialLinks] = useState();

  //fetch data from Firebase for shopItems
  useEffect(() => {
    const getSocialLinks = async () => {
      const docRef = doc(socialLinksCol, "24STOxvBEmCmBezY16LD");
      const fireStoreData = await getDoc(docRef);
      setSocialLinks(fireStoreData.data());
    };
    getSocialLinks();
  }, []);

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
            Copy Rights {year} <u>Utku Aktas</u>
          </p>
        </div>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
