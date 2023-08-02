import { useCallback, useContext, useEffect, useState } from 'react'
import { MenuItem } from '../components/MenuItem';
import { menuContext } from '../context/exportContext';
import { orderContext } from '../context/exportContext';
import './CreateOrder.css'
import { BackArrow } from '../components/backArrow';
import { NoteEditor } from '../components/NoteEditor';

export const CreateOrder = () => {
  const {buildOrderData, postOrder, orderCount, noteValue, setNoteValue} = useContext(orderContext)
  const {data, cartItems, setNoteRender} = useContext(menuContext)
  const [filter, setFilter] = useState()
 
  let menuItemList = [];
  useEffect(() => {
    for(let i = 0; i < data.length; i++) {
      if(data[i].fields) {
        menuItemList.push(<MenuItem key ={i} data = {data[i]?.fields} />)

      }
    } 

  }, [data])


const renderMenuItems = useCallback(() => {
    menuItemList = []
    for(let i = 0; i < data.length; i++) {
      // console.log(data[i]?.fields.Category)
      // console.log("filter: " + filter)  
      if(filter){
        if(data[i]?.fields.Category == filter){
          menuItemList.push(cartItems && <MenuItem key ={i} data = {data[i]?.fields} /> )
        } 
      } else {
    menuItemList.push(<MenuItem key ={i} data = {data[i]?.fields} />)

      }

      //  console.log(menuItemList.length)
    
  }
  return menuItemList

}, [data, filter])

useEffect(() => {
  renderMenuItems()
}, [data, renderMenuItems])




const filterOptions = ['Wings', 'Quesadillas', 'Topping', 'Wraps', 'Specialties', 'Sandwiches' ]
  return (
    <div className='createOrderPage'>
      <h1>Create Order</h1>
      <BackArrow data={'cashier'}/>
      <NoteEditor />
      <ul className='filterOptions'>
        {filterOptions.map((item, index) => {
          return (
            <li key ={index} className={item} ><button onClick={() => setFilter(item)}>{item}</button></li>
          )
        })}
        {/* <li className='Wings' ><button onClick={() => getDefaultCart()}>getDefaultCart</button></li> */}
        {/* <li className='Wings' ><button onClick={() => console.log(cartItems)}>cartItems</button></li> */}
        <li className='createOrderBtn' ><button onClick={() => {

          postOrder(buildOrderData(data, orderCount, noteValue))
          setNoteRender(false);
          setNoteValue(null)
          
          }}>Create Order</button>
          
          </li>
      </ul>
      <div className='menuItemContainer'>
       {cartItems && renderMenuItems()}
      </div>

    </div>
  )
}
