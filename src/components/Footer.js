import React from "react";
import "./Footer.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
const socialLinks = require("../social.json");

const Footer = () => {
  const fontSize = 18;
  const instagramLink = socialLinks.social[0].instagram;
  const tiktokLink = socialLinks.social[1].tiktok;
  const youtubeLink = socialLinks.social[2].youtube;
  return (
    <footer className="footer">
      <div className="footer__brand">
        <p>ARSTY BUTTERCUP</p>
      </div>
      <p className="footer__division">
        <CloudQueueIcon sx={{ fontSize: `${fontSize}px` }} />
      </p>

      <div className="footer__social">
        <a href={instagramLink}>Instagram</a>
        <p className="footer__division">|</p>
        <a href={tiktokLink}>Tiktok</a>
        <p className="footer__division">|</p>
        <a href={youtubeLink}>Youtube</a>
      </div>
      {/* <p className="footer__division">/</p> */}
      <p className="footer__division">
        <CloudQueueIcon sx={{ fontSize: `${fontSize}px` }} />
      </p>

      <div className="footer__copyrights">
        <div>
          <CopyrightIcon />
          <p>
            Copy Rights <u>Utku Aktas</u>
          </p>
        </div>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
