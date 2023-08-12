import { useContext, useEffect, useState } from "react";
import { orderContext } from "./exportContext";
import { menuContext } from "./exportContext";
import ordersound from '../assets/ordersound.mp3';

import { db } from "../firebase-config,js";
import { setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';

const playSound = () => {
  new Audio(ordersound).play();

}

export function OrderContextProvider(props) {
  const [orderNum, setOrderNum] = useState();
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const [ noteValue, setNoteValue ] = useState(null)
  const [status, setStatus] = useState('')
  const ordersRef = collection(db, 'Current Orders')

  const {cartItems, setCartItems, getDefaultCart,} = useContext(menuContext)
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    const orderDocs = await getDocs(ordersRef)
    const unsortedOrders = orderDocs.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setOrders(unsortedOrders.sort((a,b) => a.ordernum - b.ordernum ))
      setOrderNum(orderDocs.docs.length + 1);
      console.log('orderdocslength: ' + orderDocs.docs.length)
    }

    useEffect(() => {
      // Set up an onSnapshot listener and store the unsubscribe function
      const unsubscribe = onSnapshot(collection(db, 'Current Orders'), (snapshot) => {
        const updatedOrders = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setOrders(updatedOrders.sort((a, b) => a.ordernum - b.ordernum));
      });

      return () => {
        unsubscribe();
      };
    }, []);
    

    const buildOrderData = (data, orderNum, noteValue) => {
        setIsOrderLoading(true);
        let orderedItems = []
        let idList = ''
        for(let i = 0; i < Object.keys(cartItems).length; i++) {

            if(cartItems[i] > 0) {
              console.log('i ' + i)
              console.log(data[i])
              orderedItems.push(data[i])
            }

        }


        orderedItems.map((item) => {
          // console.log(data[item.id])
          // console.log(item)

          idList += `${cartItems[item.id]}:${data[item.id].id},`
        })


        const temp = {
            
            'ids': idList,
            'status': 'Not Started',
            'notes': noteValue,
            'ordernum': orderNum,
        };

        setOrderNum(orderNum + 1)
        setCartItems(getDefaultCart())
        console.log(temp)
        return temp

    }


    const postOrder = async (order) => {
      const docRef = doc(db, 'Current Orders', orderNum.toString())
        await setDoc(docRef, order)
    }

    const updateOrderStatus = async (orderNum, newStatus) => {
      const statusRef = doc(db, 'Current Orders', orderNum)
      await updateDoc(statusRef, {status: newStatus})
    }

    const deleteOrder = async (ordernum) => {
      await deleteDoc(doc(db, 'Current Orders', ordernum)).then(() => console.log('deleted'))
    }

    const contextValue = {
        postOrder,
        orders,
        setOrders,
        buildOrderData,
        orderNum,
        setOrderNum,
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
