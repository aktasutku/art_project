import React, { useEffect, useState, useContext } from "react";
// FIREBASE
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase";
// CONTEXT
import { ActiveAddDeleteEditContext } from "../../app/features/Context/AddEditDeleteActiveCxt";
import { SelectedItemCtx } from "../../app/features/Context/selectedItemCtx";
// HELPER
import AdminShop__Add from "./Helper/shop_AddDeleteEdit/AdminShop__Add";
import AdminShop__Delete from "./Helper/shop_AddDeleteEdit/AdminShop__Delete";
import AdminShop__Edit from "./Helper/shop_AddDeleteEdit/AdminShop__Edit";
import AdminImgCard from "./Helper/AdminImgCard";

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
      {!addItemActive && !deleteItemActive && !editItemActive && (
        <div className="adminPages__Imgbody">
          {/* Display DATABASE IMAGES */}
          {shopItems.map((item) => (
            <AdminImgCard key={item.id} item={item} imagesUrl={item.images} />
          ))}
        </div>
      )}
      {addItemActive && <AdminShop__Add />}
      {deleteItemActive && <AdminShop__Delete selectedItem={selectedItem} />}
      {editItemActive && <AdminShop__Edit selectedItem={selectedItem} />}
    </div>
  );
};

export default AdminShop;
