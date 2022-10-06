import React, { useState } from "react";
// MUI
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";

const icons = [
  { icon: AddCircleSharpIcon, name: "Add Item" },
  { icon: DeleteSharpIcon, name: "Delete Selected Item" },
  { icon: ModeEditOutlineSharpIcon, name: "Edit Selected Item" },
];

const AdminHeader = ({selectedItemData}) => {
  // Header Icons Variable
  const [addItemActive, setAddItemActive] = useState(false);
  const [deleteItemActive, setDeleteItemActive] = useState(false);
  const [editItemActive, setEditItemActive] = useState(false);

  const handleClick = (e) => {
    const name = e.toLowerCase();
    if (name.includes("add")) {
      setAddItemActive(true);
    } else if (name.includes("delete")) {
      selectedItemData ? setDeleteItemActive(true) : alert("Item not selected");
    } else if (name.includes("edit")) {
      selectedItemData ? setEditItemActive(true) : alert("Item not selected");
    }
  };
  return (
    <div className="adminPortfolio__header ">
      {/* DISPLAY HEADER ICONS */}
      {icons.map((item) => (
        <div className="adminPortfolio__header__icon" key={item.name}>
          <item.icon onClick={() => handleClick(item.name)} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminHeader;
