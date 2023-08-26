import React from 'react';
import { useState } from 'react';
import { BackArrow } from '../components/BackArrow';
import './Buser.css';
import { DraggableTable } from './DraggableTable';
function Buser() {
  const [tables, setTables] = useState([0, 1]);
  return (
    <div className='buser'>
      <BackArrow data = {''}/>
      {/* {tables.map((item, index) => {
        return (
          <div key = {index} style={{height:'100px', width: '100px', backgroundColor:'Blue'}}>item</div>
        )
      })}
      <button onClick={() => setTables([...tables, tables.length])}>Add Table</button>
      <DraggableTable data ={1}/> */}
      <h1 style={{textAlign:'center', color:'white', marginTop:'25%'}}>Page under development</h1>
    </div>
  )
}

export default Buser