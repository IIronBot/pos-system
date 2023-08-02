import { useState, useEffect, useContext, useRef} from 'react'
import { orderContext } from '../context/exportContext';
import './Order.css'
const statusOptions = ['Not Started', 'Cooking', 'Ready To Serve', 'Complete']
export function Order(prop) {
  const orderData = prop.data[0];
  const editedData = (orderData.fields.id).split(',')
  const [orderValue, setOrderValue] = useState('');
  
  const [renderstatus, setRenderStatus] = useState(false)
  const { updateOrderStatus, status, deleteOrder } = useContext(orderContext)
  const [orderCount, setOrderCount] = useState(null)
  const [localStatus, setLocalStatus] = useState(orderData.fields.Status)
  var data = prop.data[1];


  const statusRef = useRef(null)
  let statusElement = statusRef.current;

  const addClass = () => {
      statusElement = statusRef.current;
    if(statusElement.classList == 'statusChange') {
      statusElement.classList.add('active');
    } else {
      statusElement.classList.remove('active')
    }
  }


  //update status in database when status is changed
  useEffect(() => {

      updateOrderStatus(orderData.id, localStatus)
    if(statusElement) {
      statusElement.classList.remove('active')

    }
      setRenderStatus(false)
      setRenderStatus(true)

  }, [localStatus])

//adds items totals
  useEffect(() => {
    var tempVal = 0;
    if(data) {
      editedData.map((item) => {
        var id = item.split(':')[0];

        if(data[id])
        tempVal += (data[id]).fields.Price

      })
      setOrderValue(tempVal)
 }
 
 }, [data])

//sets Status when component renders
 useEffect(() => {
  if(data[editedData[0].split(':')[0]]) {
    if(!status) {
      setRenderStatus(true)
    }
    setOrderCount(orderData.fields.OrderNum)
  }
 }, [editedData])

  
  return (
    
    <div className='order'>
      <div className='notes'>
      <p>Notes</p>
      {orderData.fields.Notes ? orderData.fields.Notes : <p>__________</p>}
      </div>
      <div className ='foodItems'>
        <p>Order Number: {editedData && orderCount}</p>
      {editedData && editedData.map((item, index) => {
                var count = item.split(':')[1];
                var id = item.split(':')[0];
        try{

          return (
            <div key ={index} className='orderItem'>
            <p>{`(${count})` } {((data[id]).fields.Name)} </p>            
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
      <p className='X' onClick={() => deleteOrder()}>X</p>

    </div>
  )
}

export default Order