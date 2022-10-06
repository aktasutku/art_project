import React from "react";
import Sidebar from "../components/admin/Sidebar";
import "./Admin_Page.css";
import AdminPortfolio from "../components/admin/AdminPortfolio";
import AdminShop from "../components/admin/AdminShop";
import { selectUserName } from "../app/features/user/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Admin_Page = () => {
  const adminName = useSelector(selectUserName);
  const url = useLocation();
  const pathname = url.pathname;

  return (
    <div className="adminPage">
      <Sidebar />
      <div className="adminPage__content">
        {pathname.includes("portfolio") && <AdminPortfolio />}
        {pathname.includes("shop") && <AdminShop />}
      </div>
    </div>
  );
};

export default Admin_Page;
