import React, { useEffect, useState } from 'react'
import { menuContext } from './exportContext';
import { db } from "../firebase-config,js";
import {collection, getDocs} from 'firebase/firestore';

const getDefaultCart = () => {
  let cart = {}
  for(let i = 0; i < 31;i++) {
    cart[i] = 0;
  }
  return cart
}


export function MenuContextProvider(props) {
  const [menuData, setMenuData] = useState(null)
  const [cartItems, setCartItems] = useState(getDefaultCart())
  const [cartItemCount, setCartItemCount] = useState()
  const [noteRender, setNoteRender] = useState(false);
  const menuRef = collection(db, 'Menu')

  
  function addToCart(itemId){
    setCartItems((prev) => ({
       ...prev, [itemId]: prev[itemId] + 1 }));
    setCartItemCount(cartItems[itemId])
  }
  
  function removeFromCart(itemId){
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    setCartItemCount(cartItems[itemId])

  }
  const updateCart = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  useEffect(() => {
    const getMenu = async () => {
      const allDocs = await getDocs(menuRef)
      const unsortedMenu = allDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
      setMenuData(unsortedMenu.sort((a,b) => a.id - b.id ))

  }
  getMenu()
  
  }, [])

  const contextvalue = {
    menuData,
    setMenuData,
    setCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getDefaultCart,
    updateCart,
    cartItemCount,
    noteRender,
    setNoteRender
    
  }
  return (
    <menuContext.Provider value={contextvalue}>
      {props.children}
    </menuContext.Provider>
  )
}
