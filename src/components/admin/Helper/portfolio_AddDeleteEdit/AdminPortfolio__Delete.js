import React, { useState, useEffect, useContext } from "react";
// MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { ActiveAddDeleteEditContext } from "../../../../app/features/Context/AddEditDeleteActiveCxt";

const AdminPortfolio__Delete = ({ selectedItem }) => {
  // CONTEXT
  const { deleteActive } = useContext(ActiveAddDeleteEditContext);
  const [deleteItemActive, setDeleteItemActive] = deleteActive;

  const selectedItemColRef = doc(db, "portfolioItems", selectedItem.id);
  const selectedItemStorageRef = ref(storage, selectedItem.img);

  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  const [deleteSureActive, setDeleteSureActive] = useState(false);

  const handleDelete = () => {
    // DELETE IMG FROM STORAGE
    deleteObject(selectedItemStorageRef)
      .then(() => {
        console.log("storaged deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    // DELETE COLLECTIONG DOCUMENT FROM FIRESTORE
    deleteDoc(selectedItemColRef)
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
        onClick={() => setDeleteItemActive(false)}
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
          {!deleteButtonActive && (
            <button onClick={() => setDeleteButtonActive(true)}>Delete</button>
          )}
          {deleteButtonActive && (
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
                <button onClick={() => setDeleteButtonActive(false)}>
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolio__Delete;
