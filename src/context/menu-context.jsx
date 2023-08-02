import { useEffect, useState } from 'react'
import Airtable from 'airtable'
import { menuContext } from './exportContext';

const base = new Airtable({apiKey: 'keyJR9DzhDs8ARtft'}).base('app8oEp5f2hwX1CkP');


const getDefaultCart = () => {
  let cart = {}
  for(let i = 0; i < 31;i++) {
    cart[i] = 0;
  }
  return cart
}


export function MenuContextProvider(props) {
  const [data, setData] = useState({})
  const [cartItems, setCartItems] = useState(getDefaultCart())
  const [cartItemCount, setCartItemCount] = useState()
  const [noteRender, setNoteRender] = useState(false);

  
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
    base('Menu').select({
      maxRecords: 40,
      view: "Grid view",
      fields: ['Name', 'Price', 'Category', 'id']
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        records[index] = record
      });
  setData(records)

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  }, function done(err) {
      if (err) { console.error(err); return; }
  });

  }, [])
  const contextvalue = {
    data,
    setData,
    base,
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
