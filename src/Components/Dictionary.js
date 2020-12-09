import React, { useState } from 'react'
import Draggable from 'react-draggable'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";


export default function Dictionary({zVal,setCurrentList,id}) {
    const [toSearch,setToSearch] = useState("");
    const [res,setRes] = useState("...");
    const [flag,setFlag] = useState(false);
    const [isFetching,setIsFetching] = useState(false);
    async function getWord(){
        
        await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${toSearch}`)
        .then((res)=>{
            setIsFetching(false);
            setRes(res.data[0]);
            setFlag(true);
            
        })
        .catch((err)=>{
            setIsFetching(false);
            setFlag(false);
        });
        

    }
    return (
        <>
        <Draggable bounds="parent">
        <div className="rounded-md shadow-lg absolute bg-green-800" style={{zIndex:{zVal},height:"500px",width:"500px"}}>
             
             <div className="mb-2 text-center">
                 <IconButton onClick={()=>{
                     setCurrentList((prev)=>{return prev.filter((f) => f.id !== id);});
                 }} style={{outline:"none"}} >
                     <DeleteIcon style={{fill:"darkgray"}}></DeleteIcon>
                 </IconButton>
             </div>
             <div className="text-center" >
                <input className="mb-3 bg-green-500 placeholder-gray-700 rounded-sm border-4 border-transparent focus:outline-none focus:border-teal-900"
                     type="text" placeholder="Word..." style={{width:"400px"}}
                     value={toSearch}
                     onChange={(e)=>{
                         setToSearch(e.target.value);
                         
                     }}
                    
                    />
                <IconButton className="ml-2" 
                onClick={()=>{
                    setIsFetching(true);
                    getWord();
                    }} 
                    style={{outline:"none"}}>
                     <SearchIcon style={{fill:"greenyellow"}}></SearchIcon>
                </IconButton>
             </div>
             <div style={{height:"350px"}} className="">
                <div style={{width:"400px"}} className="my-3 p-5 ml-6 bg-green-500 rounded-sm border-2 border-green-900 h-full ">
                     { isFetching
                        ? <div>
                           
                                <div class="inline-block animate-spin ease duration-300 w-5 h-5 bg-black mx-2"></div>
                                
                            
                        </div>
                        : <div>
                            <h1 className="font-bold text-2xl">{flag===false?"....":res.word}</h1>                  
                            <h2 className="font-semibold text-xl">{flag===false?"...":"PartOfSpeech : "+res.meanings[0].partOfSpeech}</h2>
                            <h3 className="font-medium text-l">{flag===false?"..":"Definition : "+res.meanings[0].definitions[0].definition}</h3>
                            <h4 className="font-sans text-xl">{flag===false?".":"Example : "+`"${res.meanings[0].definitions[0].example}"`}</h4>
                     </div> 
                        }
                
                     
                     
                </div>
             </div>
        </div>     
        </Draggable>
        </>
    )
}
