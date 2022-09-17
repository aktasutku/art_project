import React from "react";
import "./Footer.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const Footer = () => {
  const fontSize = 18;
  return (
    <footer className="footer">
      <div className="footer__brand">
        <p>ARSTY BUTTERCUP</p>
      </div>
      <p className="footer__division">
        <CloudQueueIcon sx={{ fontSize: `${fontSize}px` }} />
      </p>

      <div className="footer__social">
        <a href="">Instagram</a>
        <p className="footer__division">|</p>
        <a href="">Tiktok</a>
        <p className="footer__division">|</p>
        <a href="">Youtube</a>
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
