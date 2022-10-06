import React, { AdminImgCarduseEffect, useState } from "react";
import "./AdminImgCard.css";

const AdminImgCard = ({ item, sendSelected, selectedId }) => {
  return (
    <div
      className={`AdminImgCard ${item.id == selectedId && "active"}`}
      onClick={() => sendSelected(item)}
    >
      <img src={item.img} loading="lazy" />
    </div>
  );
};

export default AdminImgCard;
