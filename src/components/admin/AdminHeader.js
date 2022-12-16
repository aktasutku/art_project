import React, { useContext, useState } from "react";
// MUI
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
// Context
import { ActiveAddDeleteEditContext } from "../../app/Context/AddEditDeleteActiveCxt";
import { SelectedItemCtx } from "../../app/Context/selectedItemCtx";

const icons = [
  { icon: AddCircleSharpIcon, name: "Add Item" },
  { icon: DeleteSharpIcon, name: "Delete Selected Item" },
  { icon: ModeEditOutlineSharpIcon, name: "Edit Selected Item" },
];

const AdminHeader = () => {
  // Header Icons Variable
  //CONTEXT
  const { addActive, editActive, deleteActive } = useContext(
    ActiveAddDeleteEditContext
  );
  const [selectedItem, setSelectedItem] = useContext(SelectedItemCtx);

  const [addItemActive, setAddItemActive] = addActive;
  const [deleteItemActive, setDeleteItemActive] = deleteActive;
  const [editItemActive, setEditItemActive] = editActive;

  const handleClick = (e) => {
    const name = e.toLowerCase();
    if (name.includes("add")) {
      setAddItemActive(true);
    } else if (name.includes("delete")) {
      selectedItem ? setDeleteItemActive(true) : alert("Item not selected");
    } else if (name.includes("edit")) {
      selectedItem ? setEditItemActive(true) : alert("Item not selected");
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
