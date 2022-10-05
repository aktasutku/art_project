import React, { useEffect, useState } from "react";
import "./AdminMain.css";
import AdminPortfolio__Add from "./Add/AdminPortfolio__Add";
import AdminPortfolio__Delete from "./Delete/AdminPortfolio__Delete";
import AdminPortfolio__Edit from "./Edit/AdminPortfolio__Edit";
import AdminImgCard from "./AdminImgCard";
// MUI
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
//Animate
import "animate.css";
//Firebase
import {
  onSnapshot,
  // getDocs,
  getFirestore,
  collection,
} from "firebase/firestore";

const AdminMain = () => {
  //Scrool Top when Page Load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //Variables
  const icons = [
    { icon: AddCircleSharpIcon, name: "Add Item" },
    { icon: DeleteSharpIcon, name: "Delete Selected Item" },
    { icon: ModeEditOutlineSharpIcon, name: "Edit Selected Item" },
  ];
  // Firebase Database Items
  const db = getFirestore();
  const portfolioItemsCol = collection(db, "portfolioItems");

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItemData, setSelectedItemData] = useState("");

  // Header Icons Variable
  const [addItemActive, setAddItemActive] = useState(false);
  const [deleteItemActive, setDeleteItemActive] = useState(false);
  const [editItemActive, setEditItemActive] = useState(false);

  //Set Firebase Data
  useEffect(
    () =>
      onSnapshot(portfolioItemsCol, (snapshot) => {
        setPortfolioItems(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

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
    <div className="adminMain">
      {(!addItemActive || !deleteItemActive || !editItemActive) && (
        <>
          <div className="adminMain__header animate__animated animate__bounceInDown">
            {/* DISPLAY HEADER ICONS */}
            {icons.map((item) => (
              <div className="adminMain__header__icon" key={item.name}>
                <item.icon onClick={() => handleClick(item.name)} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="adminMain__Imgbody">
            {/* Display DATABASE IMAGES */}
            {portfolioItems.map((item) => {
              return (
                <AdminImgCard
                  key={item.id}
                  item={item}
                  sendSelected={(e) => setSelectedItemData(e)}
                  selectedId={selectedItemData.id}
                />
              );
            })}
          </div>
        </>
      )}
      {/* DISPLAY ADD - EDIT - DELETE PAGE */}
      {addItemActive && <AdminPortfolio__Add setClose={setAddItemActive} />}
      {deleteItemActive && (
        <AdminPortfolio__Delete
          setClose={setDeleteItemActive}
          selectedItem={selectedItemData}
        />
      )}
 
      {editItemActive && (
        <AdminPortfolio__Edit
          setClose={setEditItemActive}
          selectedItem={selectedItemData}
        />
      )}
    </div>
  );
};

export default AdminMain;
