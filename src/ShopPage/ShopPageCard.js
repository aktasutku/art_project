import React from "react";
import "./ShopPageCard.css";
const ShopPageCard = () => {
  return (
    <div className="ShopPageCard">
      <div className="ShopPageCard__image">
        <img src="https://raw.githubusercontent.com/itbruno/productpreview/master/assets/img/t-shirt.jpg" />
      </div>
      <div className="ShopPageCard__description">
        <div className="ShopPageCard__title">
          <h3>Lorem ipsum.</h3>
          <h5>comment comment comment comment comment comment comment comment</h5>
        </div>
        <div className="ShopPageCard__price">
          <p>$</p>
          <p>90</p>
        </div>
      </div>
      <div className="ShopPageCard__QuickView">
        <p>Quick View</p>
      </div>
    </div>
  );
};

export default ShopPageCard;

// <main role="main">
// <div class="product">
//   <figure>
//     <img
//       src="https://images.unsplash.com/photo-1661762241190-a743eb81fa5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//       alt="Product Image"
//       class="product-image"
//     />
//   </figure>

//   <div class="product-description">
//     <div class="info">
//       <h1>LOREM IPSUM</h1>
//       <p>
//         Lorem Ipsum is simply dummy printing and typesetting industry
//       </p>
//     </div>

//     <div class="price">89</div>
//   </div>

//   <div class="product-sidebar">
//     <button class="buy">
//       <span>BUY ITEM</span>
//     </button>

//     <button class="info">
//       <span>MORE INFO</span>
//     </button>

//     <button class="size">
//       <span>SIZES</span>
//     </button>

//     <button class="colors">
//       <span>
//         <a href="" class="color black"></a>
//         <a href="" class="color white"></a>
//         <a href="" class="color red"></a>
//       </span>
//     </button>
//   </div>
// </div>
// </main>
