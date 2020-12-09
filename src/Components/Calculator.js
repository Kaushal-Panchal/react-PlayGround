import React, { useState } from 'react';
import Draggable from 'react-draggable';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Calculator({zVal,id,setCurrentList}) {
    const [field,setField] = useState("");
    const [currentCalculation,setCurrentCalculation] = useState("0");
    const [temp,setTemp] = useState();
    const [isSub,setIsSub] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
    const [isMul,setIsMul] = useState(false);
    const [isDiv,setIsDiv] = useState(false);
    const btnStyle = "text-2xl focus:outline-none bg-orange-600 bg-opacity-25 hover:bg-black hover:text-orange-500 h-16";
    const numberBtnClick = (val)=>{
        setField((prev)=>{
            if(prev.length>7) return prev;
            return `${prev}${val}`
        });
    }
    const allClear = ()=>{
        setField("");
        setCurrentCalculation("0");
        setTemp(0);
    }
    const clear = ()=>{
        setField(()=>{
            if(field==="") return;
            return field.slice(0,-1);
        })

    }
    const add = ()=>{
        setTemp(()=>{return parseInt(field);});
        setCurrentCalculation(`${field}`);
        setField("");
        setIsAdd(true);
    }
    const subtract = ()=>{
        setTemp(()=>{return parseInt(field);});
        setCurrentCalculation(`${field}`);
        setField("");
        setIsSub(true);
    };
    const multiply = ()=>{
        setTemp(()=>{return parseInt(field);});
        setCurrentCalculation(`${field}`);
        setField("");
        setIsMul(true);
    };
    const divide = ()=>{
        setTemp(()=>{return parseInt(field);});
        setCurrentCalculation(`${field}`);
        setField("");
        setIsDiv(true);
    };
    const equal = ()=>{
        if(isSub){
            
            setField(()=>{
                return (temp - parseInt(field)).toString();
            });
            setIsSub(false);
        }
        else if(isAdd){
            setField(()=>{
                return (temp + parseInt(field)).toString();
            });
            setIsAdd(false);
        }
        else if(isMul){
            setField(()=>{
                return (temp * parseInt(field)).toString();
            });
            setIsMul(false);
        }
        else if(isDiv){
            setField(()=>{
                return (temp / parseInt(field)).toString();
            });
            setIsDiv(false);
        }
    
        
        setTemp(0);
        setCurrentCalculation(`0`);
        
        
    };
    return (
        <>
        <Draggable bounds="parent">
            <div className="rounded-md shadow-lg absolute bg-orange-500" style={{zIndex:{zVal},height:"500px",width:"500px"}}>
             
                <div className="mb-2 text-center">
                    <IconButton onClick={()=>{
                        setCurrentList((prev)=>{return prev.filter((f) => f.id !== id);});
                    }} style={{outline:"none"}}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </div>
                <div className="mt-4 text-right px-4">
                    {currentCalculation}
                </div>
                <div className="text-center ">
                        <input type="text" value={field} disabled 
                            className="h-16 focus:outline-none  w-full bg-black text-orange-500 text-2xl text-right px-4"
                        />
                </div>
                <div className="mx-3 mt-1 grid grid-cols-4 gap-1">
                    <button className={btnStyle} onClick={()=>{allClear()}} >AC</button>
                    <span></span>
                    <span></span>
                    <button className={btnStyle} onClick={()=>{clear()}} >C</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(7)}} >7</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(8)}} >8</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(9)}} >9</button>
                    <button className={btnStyle} onClick={()=>{divide()}} >/</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(4)}} >4</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(5)}} >5</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(6)}} >6</button>
                    <button className={btnStyle} onClick={()=>{multiply()}} >*</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(1)}} >1</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(2)}} >2</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(3)}} >3</button>
                    <button className={btnStyle} onClick={()=>{subtract()}} >-</button>
                    <button className={btnStyle} onClick={()=>{numberBtnClick(0)}} >0</button>
                    <button className={`${btnStyle} col-span-2`} onClick={()=>{equal()}} >=</button>                   
                    <button className={btnStyle} onClick={()=>{add()}} >+</button>
                    
                </div> 
            </div>
        </Draggable>
        </>
    )
}
