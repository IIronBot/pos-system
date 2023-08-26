import React from 'react';
import { useState, useEffect, useContext, useRef} from 'react'
import { orderContext } from '../context/exportContext';
import './Order.css'
const statusOptions = ['Not Started', 'Cooking', 'Ready To Serve', 'Complete']

export function Order(prop) {
  const localOrderData = (prop.data)[0];
  const localMenuData = (prop.data)[1];

  const orderItemInfo = localOrderData.ids.split(',')
  const [orderValue, setOrderValue] = useState('');
  
  const [renderstatus, setRenderStatus] = useState(false)
  const { updateOrderStatus, status, deleteOrder } = useContext(orderContext)
  const [localStatus, setLocalStatus] = useState(localOrderData?.status)

  
  const statusRef = useRef(null)
  const orderRef = useRef(null)
  let statusElement = statusRef.current;

  const addClass = () => {
      statusElement = statusRef.current;
    if(statusElement.classList == 'statusChange') {
      statusElement.classList.add('active');
    } else {
      statusElement.classList.remove('active')
    }
  }


useEffect(() => {
console.log('mounted')

}, [])

// adds items totals
  useEffect(() => {
    if(!localOrderData || !localMenuData) return
    var tempVal = 0;
      (orderItemInfo).map((orderItemIds) => {
        var orderItemId= orderItemIds.split(':')[1]


        if(localMenuData[orderItemId])
        tempVal += (localMenuData[orderItemId]).price

      })
      setOrderValue(tempVal)

 
 }, [localOrderData])

//sets Status when component renders
 useEffect(() => {
    if(!status) {
      setRenderStatus(true)
    }
    setLocalStatus(localOrderData?.status)

 }, [localOrderData])

    // update status in database when status is changed
    useEffect(() => {

      if(!localStatus || !localOrderData.ordernum ) return;

        updateOrderStatus(localOrderData.id, localStatus)
      if(localStatus == 'Complete' && orderRef.current !== undefined){
        orderRef.current.classList.add('slideout')
        setTimeout(() => {
          orderRef.current?.classList.remove('slideout')
          orderRef.current?.classList.add('clear')
        console.log('clear')
        }, 1000)
      }
      if(!statusElement) return
        statusElement.classList.remove('active')
  
    }, [localStatus, orderRef])
    
  return (
    
    <div className='order' ref = {orderRef}>
      <div className='notes'>
      <p>Notes</p>
      {localOrderData?.notes ? localOrderData?.notes : <p>__________</p>}
      </div>
      <div className ='foodItems'>
        <p>Order Number: {localOrderData && localOrderData.ordernum}</p>
      {localOrderData && orderItemInfo.map((orderItemIds, index) => {

        if(orderItemIds === undefined) return;
        var count = orderItemIds.split(':')[0]
        var orderItemId= orderItemIds.split(':')[1]


        try{

          return (
            <div key ={index} className='orderItem'>
            <p>{`(${count})` } {(localMenuData[orderItemId].name)} </p>            
            </div>

            )
        } catch {
          (err) => console.log(err)
        }
      })
       }
      </div>
      <div className='orderRight'>

        <p className='orderValue'>Total: ${orderValue && orderValue}</p>
        <p className = 'status' onClick ={() => {
          addClass()
        }}>Status: {renderstatus && localStatus}
        </p>
        <ul ref ={statusRef} className='statusChange' >
          {statusOptions.map((item, index) => {
            return(
              <li style ={{cursor:'pointer'}} key ={index} onClick={() => setLocalStatus(item)}>{item}</li>
            )
          }) }
          </ul>
      </div>
      <p className='X' onClick={() => deleteOrder(localOrderData.ordernum.toString())}>X</p>

    </div>
  )
}

export default Order