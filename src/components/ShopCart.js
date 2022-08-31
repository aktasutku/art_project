import React from 'react'
import "./ShopCart.css" 

const ShopCart = (props) => {
  return (
    <div className='shopCart'>
        <img src={props.image} />
        <button>{props.name}</button>
    </div>
  )
}

export default ShopCart