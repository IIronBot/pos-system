import {useContext, useEffect} from 'react'
import { orderContext } from '../context/exportContext'
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
        {orders && <OrdersBlock />}
    </div>
  )
}

export default Cook