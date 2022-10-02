import React, { useEffect, useState } from "react";
import "./AdminMain.css";
import AdminImgContainer from "./AdminImgContainer";
import AdminPortfolioAdd from "./Add/AdminPortfolioAdd";
// MUI
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
//Animate
import "animate.css";
//Firebase
import { portfolioItemsCol } from "../../firebase";
import { getDocs } from "firebase/firestore/lite";

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
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [addActive, setAddActive] = useState(false);

  //Set Firebase Data
  useEffect(() => {
    const getPortfolioItems = async () => {
      const firestoreData = await getDocs(portfolioItemsCol);
      setPortfolioItems(
        firestoreData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPortfolioItems();
  }, []);

  
  const handleClick = (e) => {
    const name = e.toLowerCase();
    if (name.includes("add")) {
      setAddActive(true);
    } else if (name.includes("delete")) {
      console.log("delete");
    } else if (name.includes("edit")) {
      console.log("edit");
    }
  };

  return (
    <div className="adminMain">
      <div className="adminMain__header animate__animated animate__bounceInDown">
        {icons.map((item) => (
          <div className="adminMain__header__icon" key={item.name}>
            <item.icon onClick={() => handleClick(item.name)} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="adminMain__body">
        {portfolioItems.map((item) => {
          return (
            <AdminImgContainer
              key={item.title}
              item={item}
              sendSelected={(e) => setSelectedItem(e)}
            />
          );
        })}
      </div>
      {addActive && <AdminPortfolioAdd setClose={setAddActive}/>}
    </div>
  );
};

export default AdminMain;
