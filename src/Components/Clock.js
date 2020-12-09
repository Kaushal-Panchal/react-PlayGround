import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'

export default function Clock({id,zVal,setCurrentList}) {
    const [date,setDate] = useState(new Date());
    const [time,setTime] = useState({ms:0,s:0,m:0,h:0});
    const [isTimer,setIsTimer] = useState(false);
    const [isPlaying,setIsPlaying] = useState(false);
    const [interv,setInterv] = useState();
    useEffect(()=>{
        var timerId = setInterval(()=>tick(),1000);
        return function cleanup(){
            clearInterval(timerId);
        }
    });
    const tick = ()=>{
        setDate(new Date());
    }
    var updatedMs=time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
    const run = ()=>{
        if(updatedM===60){
            updatedH++;
            updatedM=0;
        }
        if(updatedS===60){
            updatedM++;
            updatedS=0;
        }
        if(updatedMs===99){
            updatedS++;
            updatedMs=0;
        }
        updatedMs++;
        return setTime({ms:updatedMs,s:updatedS,m:updatedM,h:updatedH});
    }
    const stop = ()=>{
        setIsPlaying(false);
        clearInterval(interv);
    }
    const start = ()=>{
        setIsPlaying(true);
        run();
        setInterv(setInterval(run,10));
        
    }
    const reset = ()=>{
        stop();
        setTime({ms:0,s:0,m:0,h:0});
    }
    return (
        <>
        <Draggable bounds="parent" >
        <div className="rounded-md shadow-lg absolute bg-purple-600" style={{zIndex:{zVal},height:"250px",width:"500px"}}>
             
             <div className="mb-2 text-center">
                 <IconButton onClick={()=>{
                     setCurrentList((prev)=>{return prev.filter((f) => f.id !== id);});
                 }} style={{outline:"none"}} >
                     <DeleteIcon style={{fill:"yellow"}}></DeleteIcon>
                 </IconButton>
             </div>
             <div className="my-2  text-center text-6xl bg-clip-text text-transparent bg-gradient-to-b from-orange-100 to-yellow-500">
                 {
                     (isTimer?<div>
                        <button className="hover:bg-orange-300 focus:outline-none mr-4 bg-yellow-300 rounded-full h-8 w-12 text-black text-sm" onClick={()=>{reset()}}>Reset</button>
                         {time.h>=10?time.h :"0"+time.h}:{time.m>=10?time.m :"0"+time.m}:{time.s>=10?time.s :"0"+time.s}:{time.ms>=10?time.ms :"0"+time.ms}
                        <span></span>
                            {isPlaying?
                            <button className="hover:bg-orange-300 focus:outline-none ml-4 bg-yellow-300 rounded-full h-8 w-10 text-black text-sm" onClick={()=>{stop()}}>Stop</button>:
                            <button className="hover:bg-orange-300 focus:outline-none ml-4 bg-yellow-300 rounded-full h-8 w-10 text-black text-sm" onClick={()=>{start()}}>Start</button>}
                        
                     </div>
                     :<div>{date.toLocaleTimeString()}</div>)
                 }
             </div>
             <div className="mt-4 flex justify-evenly">
                 <button className="hover:bg-yellow-300 focus:outline-none bg-yellow-600 rounded-md h-10 w-16" onClick={()=>{setIsTimer(false)}}>Clock</button>
                 <button className="hover:bg-yellow-300 focus:outline-none bg-yellow-600 rounded-md h-10 w-16" onClick={()=>{setIsTimer(true)}}>Timer</button>
             </div>
        </div>     
        </Draggable>
        </>
    )
}
