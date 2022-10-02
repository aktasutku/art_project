import React, { useState } from "react";
import "./Sidebar.css";
//MUI
import { Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PortraitIcon from "@mui/icons-material/Portrait";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoSharpIcon from "@mui/icons-material/AddAPhotoSharp";
//Redux
import { useSelector } from "react-redux";
import {
  selectUserPhoto,
  selectUserName,
} from "../../app/features/user/userSlice";
import { NavLink } from "react-router-dom";
//animate
import "animate.css";

const Sidebar = () => {
  // const photoUrl =  useSelector(selectUserPhoto);
  const adminName = useSelector(selectUserName);
  const firstLetter = adminName[0];
  const [open, setOpen] = useState(false);

  const sideBarContent = [
    { name: "Home", icon: HomeIcon },
    { name: "Shop", icon: ShoppingBagIcon },
    { name: "Portfolio", icon: PortraitIcon },
    { name: "About Me", icon: InfoIcon },
    { name: "Behind the Scenes", icon: AddAPhotoSharpIcon },
  ];

  const mainClass = open ? "sideBar sideBar__show" : "sideBar sideBar_hide";
  const contentClass = !open && "sideBar__hide__content";

  const handleSize = () => {
    setOpen(!open);
  };
  const closeSideBar = () => {
    setOpen(false);
  };
  const handleLink = (name) => {
    return name.toLocaleLowerCase().replaceAll(" ", "-");
  };
  return (
    // <div className={mainClass}>
    <div className={`${mainClass} animate__animated animate__bounceInLeft`}>
      <div className="sideBar__header">
        <div className="menu_buttons" onClick={handleSize}>
          <MenuIcon className="sideBar_icon" />
          <p className={contentClass}>Menu</p>
        </div>
      </div>
      <hr className="sideBar__divider" />
      <div className="sideBar__content">
        {sideBarContent.map((item) => {
          return (
            <NavLink
              to={handleLink(item.name)}
              key={item.name}
              onClick={closeSideBar}
            >
              <div className="menu_buttons">
                <item.icon />
                <p className={contentClass}>{item.name}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
      <hr className="sideBar__divider" />
      <div className="sideBar__footer">
        <Avatar>{firstLetter}</Avatar>
        <p className={contentClass}>{adminName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
