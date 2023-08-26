import React from 'react';
import "./MenuItem.css"
import { menuContext } from "../context/exportContext"
import { useContext, useEffect, useState } from "react"

export const MenuItem = (prop) => {
  const [inputValue, setInputValue] = useState(0)
  const {cartItems, updateCart, addToCart, removeFromCart} = useContext(menuContext)
  const {name, price, id} = prop.data
  

  useEffect(() => {
    updateCart(inputValue, id)

  },[inputValue])
    return (
      <div className="menuItemParent">

    <div className="menuItem">
        <p className="menuItemName">{name}</p>
        <p>${price}{price > 1 && '.00'}</p>
        {/* <p>{Count}</p> */}
        <button onClick={() => {
          removeFromCart(id)
          }}>-</button>
        <p className="count">{ cartItems[id] && cartItems[id]}</p>

        <input className = 'countInput' style={{width:"25px", height:"15px"}} type = "number" onChange={(e) => {
          if(isNaN(parseInt(e.target.value))) {
            setInputValue(0)
          } else {
            setInputValue(parseInt(e.target.value))

          }
        }}/>
        <button onClick={() => {
          addToCart(id)
          }}>+</button>
        
    </div>
    </div>
  
  )
}
