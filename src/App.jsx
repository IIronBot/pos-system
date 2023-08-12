import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Cashier } from './pages/Cashier'
import { JobChoice } from './pages/Jobchoice'
import { MenuContextProvider } from './context/menu-context.jsx'
import { OrderContextProvider } from './context/orders-context'
import { CreateOrder } from './pages/CreateOrder'
import Cook from './pages/Cook'
import Buser from './pages/Buser'
function App() {

  return (
    <>
      <MenuContextProvider>
        <OrderContextProvider>
          <Router>
            <Routes>
              <Route path='/' element = {<JobChoice />} />
              <Route path='/cashier' element = {<Cashier />} /> 
              <Route path ='/order' element = {<CreateOrder />}/> 
              <Route path ='/cook' element = {<Cook />}/>
              <Route path ='/buser' element = {<Buser />}/>


            </Routes>
          </Router>
        </OrderContextProvider>
      </MenuContextProvider>
    </>
  )
}

export default App
