import React, { useState, useEffect } from "react";
// MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
// FIREBASE
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const AdminPortfolio__Delete = ({ setClose, selectedItem }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // variables
  const db = getFirestore();
  const storage = getStorage();
  const collectionRef = doc(db, "portfolioItems", selectedItem.id);
  const storageRef = ref(storage, selectedItem.img);

  const [deleteActive, setDeleteActive] = useState(false);
  const [deleteSureActive, setDeleteSureActive] = useState(false);

  const handleDelete = () => {
    // DELETE IMG FROM STORAGE
    deleteObject(storageRef)
      .then(() => {
        console.log("storaged deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    // DELETE COLLECTIONG DOCUMENT FROM FIRESTORE
    deleteDoc(collectionRef)
      .then(() => {
        setDeleteSureActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="adminAddDeleteEdit">
      <div
        className="adminAddDeleteEdit__close"
        onClick={() => setClose(false)}
      >
        <CloseSharpIcon />
      </div>
      <div className="adminAddDeleteEdit__img">
        <img src={selectedItem.img} />
      </div>
      <div className="adminAddDeleteEdit__form ">
        <p>Delete Mode</p>
        <div className="adminflexRow">
          <p>Title : </p>
          <p>{selectedItem.title}</p>
        </div>
        <div className="adminAddDeleteEdit__buttons">
          {!deleteActive && (
            <button onClick={() => setDeleteActive(true)}>Delete</button>
          )}
          {deleteActive && (
            <div style={{ display: "flex", gap: "20px" }}>
              {!deleteSureActive && (
                <button onClick={handleDelete}>Are you Sure (Delete) ?</button>
              )}
              {deleteSureActive && (
                <p className="adminAddDeleteEdit__success">
                  Deleted
                  <DoneSharpIcon sx={{ color: "green" }} />
                </p>
              )}
              {!deleteSureActive && (
                <button onClick={() => setDeleteActive(false)}>Cancel</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolio__Delete;
