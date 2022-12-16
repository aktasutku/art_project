import React, { useContext } from "react";
import "./Admin_Page.css";
// Admin components
import Sidebar from "../components/admin/Sidebar";
import AdminPortfolio from "../components/admin/AdminPortfolio";
import AdminShop from "../components/admin/AdminShop";
import AdminHeader from "../components/admin/AdminHeader";
// React Router
import { useLocation } from "react-router-dom";
// Context
import { ActiveAddDeleteEditContext } from "../app/Context/AddEditDeleteActiveCxt";

const Admin_Page = () => {
  // const adminName = useSelector(selectUserName);
  const url = useLocation();
  const pathname = url.pathname;

  //CONTEXT
  const { addActive, editActive, deleteActive } = useContext(
    ActiveAddDeleteEditContext
  );

  const [addItemActive] = addActive;
  const [deleteItemActive] = deleteActive;
  const [editItemActive] = editActive;

  return (
    <div className="adminPage">
      <Sidebar />
      <div className="adminPage__content">
        {!addItemActive && !deleteItemActive && !editItemActive && (
          <AdminHeader />
        )}
        {pathname.includes("portfolio") && <AdminPortfolio />}
        {pathname.includes("shop") && <AdminShop />}
      </div>
    </div>
  );
};

export default Admin_Page;
