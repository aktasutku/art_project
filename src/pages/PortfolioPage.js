import React, { useEffect, useState, forceUpdate } from "react";
import "./PortfolioPage.css";
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

//Images jSON
const portfolio = require("../portfolioItems.json");

const PortfolioPage = () => {
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  //   let singleItem = {};
  const [singleItem, setSingleItem] = useState({});

  const handleOpenWide = (e) => {
    setId(e.target.id);
    setSingleItem(
      portfolio.portfolioItemData.find((item) => item.id == e.target.id)
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigation = (e) => {
    let itemIndex = 0;
    if (e.target.className.baseVal.includes("openWide_right")) {
      itemIndex = portfolio.portfolioItemData.indexOf(singleItem);
      if (itemIndex < portfolio.portfolioItemData.length-1) {
        itemIndex += 1;
      }
      setSingleItem(portfolio.portfolioItemData[itemIndex]);
    } else {
      itemIndex = portfolio.portfolioItemData.indexOf(singleItem);
      if (itemIndex > 0) {
        itemIndex -= 1;
      }
      setSingleItem(portfolio.portfolioItemData[itemIndex]);
    }
  };

  const OpenWide = () => {
    // singleItem = portfolio.portfolioItemData.find((item) => item.id == itemId);

    // useEffect(() => {
    //   setSingleItem(portfolio.portfolioItemData.find((item) => item.id == id));
    // });

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
          {portfolio.portfolioItemData.map((item) => (
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
      {/* {open && OpenWide()} */}
      {open && <OpenWide />}
    </div>
  );
};

export default PortfolioPage;
