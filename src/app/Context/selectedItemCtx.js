import { createContext, useState } from "react";

export const SelectedItemCtx = createContext();

const SelectedItemProvider = (props) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <SelectedItemCtx.Provider value={[selectedItem, setSelectedItem]}>
      {props.children}
    </SelectedItemCtx.Provider>
  );
};
export default SelectedItemProvider;
