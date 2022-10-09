import React, { useEffect, useState, useContext } from "react";
import "./AdminPortfolio.css";
import AdminPortfolio__Add from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Add";
import AdminPortfolio__Delete from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Delete";
import AdminPortfolio__Edit from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Edit";
import AdminImgCard from "./Helper/AdminImgCard";

//Animate
import "animate.css";
//Firebase
import {
  onSnapshot,
  // getDocs,
  getFirestore,
  collection,
} from "firebase/firestore";
import { SelectedItemCtx } from "../../app/features/Context/selectedItemCtx";
import { ActiveAddDeleteEditContext } from "../../app/features/Context/AddEditDeleteActiveCxt";

const AdminPortfolio = () => {
  //Scrool Top when Page Load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Firebase Database Items
  const db = getFirestore();
  const portfolioItemsCol = collection(db, "portfolioItems");
  const [portfolioItems, setPortfolioItems] = useState([]);

  // CONTEXT
  const { addActive, editActive, deleteActive } = useContext(
    ActiveAddDeleteEditContext
  );
  // GET SELECTED ITEM FROM IMG CARD
  const [selectedItem, setSelectedItem] = useContext(SelectedItemCtx);
  // OPEN CLOSE COMPONENTS
  const [addItemActive, setAddItemActive] = addActive;
  const [deleteItemActive, setDeleteItemActive] = deleteActive;
  const [editItemActive, setEditItemActive] = editActive;

  // GET PORTFOLIO COLLECTION DOCUMENTS
  useEffect(
    () =>
      onSnapshot(portfolioItemsCol, (snapshot) => {
        setPortfolioItems(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  return (
    <div className="adminPortfolio">
      {(!addItemActive || !deleteItemActive || !editItemActive) && (
        <>
          <div className="adminPortfolio__Imgbody">
            {/* Display DATABASE IMAGES */}
            {portfolioItems.map((item) => {
              return (
                <AdminImgCard key={item.id} item={item} imageUrl={item.img} />
              );
            })}
          </div>
        </>
      )}
      {/* DISPLAY ADD - EDIT - DELETE PAGE */}
      {addItemActive && <AdminPortfolio__Add />}
      {deleteItemActive && (
        <AdminPortfolio__Delete selectedItem={selectedItem} />
      )}
      {editItemActive && <AdminPortfolio__Edit selectedItem={selectedItem} />}
    </div>
  );
};

export default AdminPortfolio;
