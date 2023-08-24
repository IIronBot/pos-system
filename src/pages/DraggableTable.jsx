import { useRef } from "react";

export const DraggableTable = (prop) => {
    var startX, startY, currX, currY;
    const tableRef = useRef(null)

    const getStartPosition = (e) => {

        startX = e.clientX
        startY = e.clientY
        if(!tableRef.current) return
        tableRef.current.style.transform = `translate(${startX}, ${startY})`
    }

    const dropElement = (e) => {
        currX = e.clientX
        currY = e.clientY
        tableRef.current.style.transform = `translate(${currX}, ${currY})`
        
    }
  return ( 
    <div ref ={tableRef} className ={`table ${prop.data}`} draggable = 'true' style = {{height:'100px', width:'100px', backgroundColor:'orange'}} onDrag={(e) => getStartPosition(e)} onDragEnd={(e) => dropElement(e)}>
{prop.data}
    </div>
  )
}
