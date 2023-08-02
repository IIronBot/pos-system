import { useContext, useEffect, useRef } from 'react'
import './NoteEditor.css'
import { Note } from 'phosphor-react'
import { orderContext } from '../context/exportContext';
import { menuContext } from '../context/exportContext';

export function NoteEditor() {
const noteRef = useRef(null);
const {noteValue, setNoteValue} = useContext(orderContext)
const {noteRender, setNoteRender} = useContext(menuContext)

const run = () => {
  if(noteRef.current){
  setNoteValue(noteRef.current.value) 
  console.log(noteValue)
  }
}
useEffect(() => {
  run()
}, [noteRef])
  return (
    <div >
      <Note className='noteIcon' onClick={() => {
        setNoteRender(!noteRender)
      }}/>
      {noteRender && <div className='notepad'><p >Note</p><textarea value = {noteValue} onChange={() => run()} ref ={noteRef}></textarea></div>}
    </div>
  )
}
