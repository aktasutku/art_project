import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
// import { shopItemsCol } from "../../firebase";
import { onSnapshot, collection, getFirestore } from "firebase/firestore";

const AdminShop = () => {
  // VARIABLES
  const [shopItems, setShopItems] = useState([]);
  // FIREBASE VARIABLES
  const db = getFirestore();
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
    <div className="adminPortfolio">
      <AdminHeader />
      AdminShop
    </div>
  );
};

export default AdminShop;
