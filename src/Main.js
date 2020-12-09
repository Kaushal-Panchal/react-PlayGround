
import React, { useState } from 'react'
import MediaQuery from 'react-responsive';
import Calculator from './Components/Calculator';
import Clock from './Components/Clock';
import Dictionary from './Components/Dictionary';
import Game from './Components/Game';
import skull from './Image/skull.svg';
import Header from './Components/Header'
import Notes from './Components/Notes'


export default function Main() {
    const [currentList,setCurrentList] = useState([]);
    
    return (
        <>
        <MediaQuery minDeviceWidth={650} >
        <Header currentList={currentList} setCurrentList={setCurrentList} ></Header>
        <div className="h-1 shadow-lg animate-pulse  bg-purple-700 "> </div>
        <div className="mt-0 z-0 h-screen relative bg-gray-800 ">
            {currentList.map((v,index)=>{
                const k = v.id;               
                switch(v.component){
                    case "Notes": return <Notes key={k} id={v.id} zVal={index} setCurrentList={setCurrentList}></Notes>;
                    case "Calculator": return <Calculator key={k} id={v.id} zVal={index} setCurrentList={setCurrentList}></Calculator>;
                    case "Clock": return <Clock key={k} id={v.id} zVal={index} setCurrentList={setCurrentList}></Clock>;
                    case "Dictionary": return <Dictionary key={k} id={v.id} zVal={index} setCurrentList={setCurrentList}></Dictionary>;
                    case "Game": return <Game key={k} id={v.id} zVal={index} setCurrentList={setCurrentList}></Game>;
                    default: return null;
                }
            })}
        </div>       
        </MediaQuery>
        <MediaQuery maxDeviceWidth={650}>
            <div className="flex h-screen align-middle">
            <div className="m-auto  ">
                <img src={skull} alt="skull" height="250px" width="250px" className="p-34 animate-bounce"/>
                <h1 className="mt-5 text-center text-2xl font-sans text-black">Get a BIG-SCREEN!</h1>
            </div>
            </div>
        </MediaQuery>
          
        
        </>
    )
}
