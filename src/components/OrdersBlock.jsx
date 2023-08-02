import { useContext, useEffect, useState } from 'react'
import { menuContext, orderContext } from '../context/exportContext'
import {Order} from './Order'
import './OrdersBlock.css'

function OrdersBlock() {
  const [render, setRender] = useState(false)
  const {orders} = useContext(orderContext)
  const {data} = useContext(menuContext)


  useEffect(() => {
    if(data) {
      if(orders) {
        setRender(true)
      }}
  }, [data, orders])

  return (
    <div className='ordersBlockParent'>
        <h2 style={{textAlign: 'center', margin: '40px 0px 40px 0px'}}>Current Orders</h2>
        <div>
        <ul className='ordersBlock'>
          {render && orders.map((item, index) => {
            return(
              <li key ={index}>
                <Order  data ={[orders[index], data]} />

              </li>

            )
          })}
        </ul>
        </div>

    </div>
  )
}

export default OrdersBlock