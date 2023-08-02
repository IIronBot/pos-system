import { useContext, useEffect, useState } from "react";
import { orderContext } from "./exportContext";
import { menuContext } from "./exportContext";
import ordersound from '../assets/ordersound.mp3';

const playSound = (sound) => {
  new Audio(ordersound).play();

}
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_ORDERS_TABLE_ID}`
const headers = {
    "Authorization": `Bearer ${import.meta.env.VITE_PERS_TOKEN}`,
    'Content-Type': 'application/json',
}

export function OrderContextProvider(props) {
  const [orderCount, setOrderCount] = useState();
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const [ noteValue, setNoteValue ] = useState(null)
  const [status, setStatus] = useState('')

    const {cartItems, setCartItems, getDefaultCart, base} = useContext(menuContext)
  const [orders, setOrders] = useState('')


  const fetchOrders = () => {
    base('Current Orders').select({
      view: "Grid view",
      fields: ['OrderNum', 'id', 'Status', 'Notes']
    }).eachPage(function page(records, fetchNextPage){
      records.forEach(function(record, index) {
        records[index] = record
        
      })
      setOrders(records)
      setOrderCount(records.length);

    })
  }


    const buildOrderData =  (data, orderCount, noteValue) => {
        setIsOrderLoading(true);
        let rawCartItems = []
        let idList = ''
        for(let i = 0; i < Object.keys(cartItems).length; i++) {

            if(cartItems[i] > 0) {
              rawCartItems.push(data[i].fields)
            }

        }

        rawCartItems.map((item) => {
          idList += `${item.id}:${cartItems[item.id]},`
        })


        const temp = {
          "fields": {
            
            'id': idList,
            'Status': 'Not Started',
            'Notes': noteValue
          }
        };

        let final = {
            "records": [temp]
        }
        setOrderCount(orderCount + 1)
        setCartItems(getDefaultCart())
        console.log(final)
        return final

    }


    const postOrder = (order) => {
        fetch(url, {
            method: 'POST',
            headers: headers,
            typecast: true,
            body: JSON.stringify(order)
          })
            .then(response => response.json())
            .then(data => {
              setIsOrderLoading(false)
              playSound(ordersound)
              console.log(data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }


    const updateOrderStatus = (orderRecordId, newStatus) => {
      setIsOrderLoading(true)
    const statusUpdateUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_ORDERS_TABLE_ID}/${orderRecordId}`
      fetch(statusUpdateUrl,  {
        method: 'PATCH',
        headers: headers,
        typecast: true,
        body: JSON.stringify({
            'fields': {
              'Status': newStatus
            }
          }
        )
      } 
        ).then((res) => res.json()).then((data) => {
          console.log(data)
      setIsOrderLoading(true)
    })
    }

    const deleteOrder = (orderRecordId) => {
    const deleteOrderUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_ORDERS_TABLE_ID}/${orderRecordId}`

      fetch(deleteOrderUrl,  {
        method: 'DELETE',
        headers: headers,
        typecast: true,
      } 
        ).then((res) => res.json()).then((data) => console.log(data?.deleted))
    }
    const contextValue = {
        postOrder,
        orders,
        setOrders,
        buildOrderData,
        orderCount,
        setOrderCount,
        fetchOrders,
        isOrderLoading,
        setIsOrderLoading,
        noteValue,
        setNoteValue,
        updateOrderStatus,
        status,
        setStatus,
        deleteOrder
        
    }
  return (
    <orderContext.Provider value = {contextValue}>
        {props.children}
    </orderContext.Provider>
  )
}
