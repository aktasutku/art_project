import { createContext, useState } from "react";

export const ActiveAddDeleteEditContext = createContext();

const ActiveAddDeleteEditProvider = (props) => {
  const [addItemActive, setAddItemActive] = useState(false);
  const [deleteItemActive, setDeleteItemActive] = useState(false);
  const [editItemActive, setEditItemActive] = useState(false);

  return (
    <ActiveAddDeleteEditContext.Provider
      value={{
        addActive: [addItemActive, setAddItemActive],
        deleteActive: [deleteItemActive, setDeleteItemActive],
        editActive: [editItemActive, setEditItemActive],
      }}
    >
      {props.children}
    </ActiveAddDeleteEditContext.Provider>
  );
};
export default ActiveAddDeleteEditProvider;
