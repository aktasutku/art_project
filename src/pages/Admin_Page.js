import React from "react";
import Sidebar from "../components/admin/Sidebar";
import "./Admin_Page.css";
import AdminMain from "../components/admin/AdminMain";

const Admin_Page = () => {
  return (
    <div className="adminPage">
      <Sidebar />
      <div className="adminPage__content">
        <AdminMain />
      </div>
    </div>
  );
};

export default Admin_Page;
