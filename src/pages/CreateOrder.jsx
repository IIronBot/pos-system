import { useCallback, useContext, useEffect, useState } from 'react'
import { MenuItem } from '../components/MenuItem';
import { menuContext } from '../context/exportContext';
import { orderContext } from '../context/exportContext';
import './CreateOrder.css'
import { BackArrow } from '../components/backArrow';
import { NoteEditor } from '../components/NoteEditor';

export const CreateOrder = () => {
  const {buildOrderData, postOrder, orderNum, noteValue, setNoteValue} = useContext(orderContext)
  const {menuData, cartItems, setNoteRender} = useContext(menuContext)
  const [filter, setFilter] = useState()
 
  let menuItemList = [];
  useEffect(() => {
    if(!menuData) return
    for(let i = 0; i < menuData.length; i++) {
      if(menuData[i]) {
        menuItemList.push(<MenuItem key ={i} data = {menuData[i]} />)

      }
    } 

  }, [menuData])


const renderMenuItems = useCallback(() => {
    menuItemList = []
    if(!menuData) return
    for(let i = 0; i < menuData.length; i++) {
      // console.log(data[i]?.fields.Category)
      // console.log("filter: " + filter)  
      if(filter){
        if(menuData[i].category == filter){
          menuItemList.push(cartItems && <MenuItem key ={i} data = {menuData[i]} /> )
        } 
      } else {
    menuItemList.push(<MenuItem key ={i} data = {menuData[i]} />)

      }

      //  console.log(menuItemList.length)
    
  }
  return menuItemList

}, [menuData, filter])

useEffect(() => {
  renderMenuItems()
}, [menuData, renderMenuItems])




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
        <li className='Wings' ><button onClick={() => console.log(cartItems)}>cartItems</button></li>
        <li className='createOrderBtn' ><button onClick={() => {

          postOrder(buildOrderData(menuData, orderNum, noteValue))
          setNoteRender(false);
          setNoteValue(null)
          
          }}>Create Order</button>
          
          </li>
      </ul>
      <div className='menuItemContainer'>
       {menuData && renderMenuItems()}
      </div>

    </div>
  )
}
