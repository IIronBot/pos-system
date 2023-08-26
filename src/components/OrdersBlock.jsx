import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { menuContext, orderContext } from '../context/exportContext'
import {Order} from './Order'
import './OrdersBlock.css'

function OrdersBlock() {
  const [render, setRender] = useState(false)
  const {orders} = useContext(orderContext)
  const {menuData} = useContext(menuContext)


  useEffect(() => {
    if(!orders || !menuData) return
      setRender(true)
  }, [orders, menuData])

  return (
    <div className='ordersBlockParent'>
        <h2 style={{textAlign: 'center', margin: '40px 0px 40px 0px'}}>Current Orders</h2>
        <div>
        <ul className='ordersBlock'>
          {render && orders.map((item, index) => {
            if(item.status == 'Complete') return
            return(
              <li key ={index}>
                <Order  data ={[item, menuData]} />

              </li>

            )
          })}
        </ul>
        </div>

    </div>
  )
}

export default OrdersBlock