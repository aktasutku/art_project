import React, { useEffect, useState, forceUpdate } from "react";
import "./Portfolio_Page.css";
//MUI
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
//MUI icons
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
//Animate.css
import "animate.css";
//Firebase
import { portfolioItemsCol } from "../firebase";
import { getDocs } from "firebase/firestore/lite";

//Images jSON
// const portfolio = require("../portfolioItems.json");
// portfolio.portfolioItemData.map(()=>) if you want to switch to json file

const PortfolioPage = () => {
  const [open, setOpen] = useState(false);
  const [singleItem, setSingleItem] = useState({});
  const [portfolioItems, setPortfolioItems] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Set Firebase Data
  useEffect(() => {
    const getPortfolioItems = async () => {
      const firestoreData = await getDocs(portfolioItemsCol);
      setPortfolioItems(
        firestoreData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPortfolioItems();
  }, []);

  const handleOpenWide = (e) => {
    setSingleItem(portfolioItems.find((item) => item.id == e.target.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //******************************************** */
  const handleNavigation = (e) => {
    let itemIndex = 0;
    if (e.target.className.baseVal.includes("openWide_right")) {
      itemIndex = portfolioItems.indexOf(singleItem);
      if (itemIndex < portfolioItems.length - 1) {
        itemIndex += 1;
      }
      setSingleItem(portfolioItems[itemIndex]);
    } else {
      itemIndex = portfolioItems.indexOf(singleItem);
      if (itemIndex > 0) {
        itemIndex -= 1;
      }
      setSingleItem(portfolioItems[itemIndex]);
    }
  };
  //******************************************** */
  const OpenWide = () => {
    return (
      <div className={open ? "openWide" : "openWide_none"}>
        <div className="openWide_img">
          <CloseIcon className="openWide_closeIcon" onClick={handleClose} />
          <img
            src={singleItem.img}
            className={"animate__animated animate__zoomIn"}
          />
          <ArrowCircleRightOutlinedIcon
            className="openWide_right"
            onClick={handleNavigation}
          />
          <ArrowCircleLeftOutlinedIcon
            className="openWide_left"
            onClick={handleNavigation}
          />
        </div>
      </div>
    );
  };
  //******************************************** */
  return (
    <div className="portfolioPage">
      <div className="portfolioPage_header">My Artworks</div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: "20px",
        }}
      >
        <ImageList variant="masonry" cols={5} gap={8}>
          {/* {portfolio.portfolioItemData.map((item) => ( */}
          {portfolioItems.map((item) => (
            <ImageListItem key={item.id}>
              <img
                id={item.id}
                src={item.img}
                alt={item.title}
                loading="lazy"
                onClick={handleOpenWide}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {open && <OpenWide />}
    </div>
  );
};

export default PortfolioPage;
