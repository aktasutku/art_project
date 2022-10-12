import React, { useEffect, useState, useContext } from "react";
import AdminImgCard from "./Helper/AdminImgCard";
// FIREBASE
import { onSnapshot, collection } from "firebase/firestore";
// CONTEXT
import { ActiveAddDeleteEditContext } from "../../app/features/Context/AddEditDeleteActiveCxt";
import { SelectedItemCtx } from "../../app/features/Context/selectedItemCtx";
import { db } from "../../firebase";
import AdminPortfolio__Add from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Add";
import AdminPortfolio__Delete from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Delete";
import AdminPortfolio__Edit from "./Helper/portfolio_AddDeleteEdit/AdminPortfolio__Edit";
import AdminShop__Add from "./Helper/shop_AddDeleteEdit/AdminShop__Add";

const AdminShop = () => {
  // VARIABLES
  const [shopItems, setShopItems] = useState([]);
  // CONTEXT
  const { addActive, editActive, deleteActive } = useContext(
    ActiveAddDeleteEditContext
  );
  const [selectedItem, setSelectedItem] = useContext(SelectedItemCtx);
  const [addItemActive, setAddItemActive] = addActive;
  const [deleteItemActive, setDeleteItemActive] = deleteActive;
  const [editItemActive, setEditItemActive] = editActive;
  // FIREBASE VARIABLES
  const shopItemsCol = collection(db, "shopItems");

  // GET SHOP COLLECTION DOCUMENETS
  useEffect(
    () =>
      onSnapshot(shopItemsCol, (snapshot) => {
        setShopItems(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  return (
    <div className="adminPages">
      {(!addItemActive && !deleteItemActive && !editItemActive) && (
        <div className="adminPages__Imgbody">
          {/* Display DATABASE IMAGES */}
          {shopItems.map((item) => (
            <AdminImgCard key={item.id} item={item} imagesUrl={item.images} />
          ))}
        </div>
      )}
      {addItemActive && <AdminShop__Add />}
      {deleteItemActive && (
        <AdminPortfolio__Delete setClose={setDeleteItemActive} />
      )}
      {editItemActive && <AdminPortfolio__Edit setClose={setEditItemActive} />}
    </div>
  );
};

export default AdminShop;
