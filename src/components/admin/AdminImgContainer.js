import React, { useEffect, useState } from "react";
import "./AdminImgContainer.css";

const AdminImgContainer = ({ item, sendSelected }) => {
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const handleSelected = () => {
    setSelected(!selected);
    !selected ? setSelectedItem(item) : setSelectedItem([]);
  };
  useEffect(() => {
    sendSelected(selectedItem);
  }, [selected]);
  return (
    <div
      // className={active ? "adminImgContainer active" : "adminImgContainer"}
      className={`adminImgContainer ${selected && "selected"}`}
      onClick={handleSelected}
    >
      <img src={item.img} />
    </div>
  );
};

export default AdminImgContainer;
