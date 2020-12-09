import React, { useState } from 'react'
import Draggable from 'react-draggable'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Notes({zVal,setCurrentList,id}) {
    const [head,setHead] = useState("");
    const [notes,setNotes] = useState("");


    return (
        <>
        <Draggable bounds="parent">
            
            <div className="h-72 w-56 rounded-md shadow-lg absolute bg-teal-500" style={{zIndex:{zVal}}}>
            
                <div className="text-center">
                <IconButton onClick={()=>{
                    setCurrentList((prev)=>{
                        return prev.filter((f) => f.id !== id);
                    });
                }} style={{outline:"none"}}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                    <input className="mb-3  bg-teal-400 placeholder-gray-700 rounded-sm border-4 border-transparent focus:outline-none focus:border-teal-900"
                     type="text" placeholder="Head" value={head}
                     onChange={(e)=>{
                         setHead(e.target.value);
                     }}
                    
                    />
                </div>
                <div className="text-center box-border h-full" >
                    <textarea className="my-2 resize-none bg-teal-400 placeholder-gray-700 rounded-sm border-4 border-transparent focus:outline-none focus:border-teal-900"
                     placeholder="Notes.." name="" id="" cols="" rows="7"
                     value={notes}
                     onChange={(e)=>{
                         setNotes(e.target.value)
                     }}
                     
                     ></textarea>
                </div>

            </div>
        </Draggable>
        </>
    )
}
