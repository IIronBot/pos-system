import {useContext, useEffect} from 'react'
import { menuContext, orderContext } from '../context/exportContext'
import OrdersBlock from '../components/OrdersBlock'
import { BackArrow } from '../components/backArrow'
import './Cook.css'
function Cook() {
  const {orders, fetchOrders} = useContext(orderContext)
  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='cook'>
      <BackArrow data = {''} />
      {/* {menuData&& data.map((item, index) => {
        return(
        <h1 key = {index}>
          Name: {item.name} 
          </h1>)
        }
        )} */}
        <p>Orders: {orders[0] && orders[0].ids}</p>
        {orders != {} && <OrdersBlock />}
    </div>
  )
}

export default Cook