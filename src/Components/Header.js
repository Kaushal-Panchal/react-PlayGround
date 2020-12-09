import React from 'react'


export default function Header({setCurrentList}) {
    const btnStyle = "lg:mr-5 mr-3 border-none border-transparent transition duration-500 ease-in-out  hover:bg-pink-600 transform hover:-translate-y-1 hover:scale-110 shadow-lg rounded-full py-1 px-4 lg:py-3 lg:px-6 bg-purple-700 text-white";
    const addComponent = (val)=>{
        var toAdd = {component:val , id : new Date().getTime()+Math.random()}
        setCurrentList((prev)=>{
            return [...prev,toAdd]
        });
    }
    return (
        <>
         <div className="mt-0 md:h-32 h-24 shadow-2xl w-auto flex items-center justify-between bg-black overflow-visible">
            <h1 className="text-purple-500 text-2xl lg:text-5xl ml-10  font-head font-medium">PlayGround</h1>
            <div className="flex">
                <button className={btnStyle} style={{outline: 'none'}} onClick={()=>{addComponent("Notes");}}>Notes</button>
                <button className={btnStyle} style={{outline: 'none'}} onClick={()=>{addComponent("Calculator");}}>Calculator</button>
                <button className={btnStyle} style={{outline: 'none'}} onClick={()=>{addComponent("Clock");}}>Clock</button>
                <button className={btnStyle} style={{outline: 'none'}} onClick={()=>{addComponent("Dictionary");}}>Dictionary</button>
                <button className={btnStyle} style={{outline: 'none'}} onClick={()=>{addComponent("Game");}}>Game</button>
                
            </div> 
         </div>
        </>
    )
}
