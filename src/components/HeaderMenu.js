import React from "react";

const HeaderMenu = () => {
  return (
    <div>
      <li className={borderBottom && "borderBottom"} onClick={handleBorder}>
        <Link to="/">Home</Link>
      </li>
    </div>
  );
};

export default HeaderMenu;
