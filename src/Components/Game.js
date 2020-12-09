import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const SCALE = 20;
const SPEED = 100;
const DIRECTIONS = {
    38:[0,-1],
    40:[0,1],
    37:[-1,0],
    39:[1,0],
};
export default function Game({zVal,setCurrentList,id}) {
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    function useInterval(callback, delay) {
        const savedCallback = useRef();
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    const canvasRef = useRef();
    const [snake,setSnake] = useState([
        [8, 7],
        [8, 8]
      ]);
    const [apple,setApple] = useState([8,3]);
    const [dir,setDir] = useState([0,-1]);
    const [speed,setSpeed] = useState(null);
    const [gameOver,setGameOver] = useState(false);  


    const startGame = ()=>{
        setSnake([
            [8, 7],
            [8, 8]
          ]);
        setApple([8,3]);
        setDir([0,-1]);
        setSpeed(SPEED);
        setGameOver(false);  

    };
    const endGame = ()=>{
        setSpeed(null);
        setGameOver(true);
    };
    const moveSnake = ({keyCode})=>{
        if(keyCode>=37 && keyCode<=40){
            setDir(DIRECTIONS[keyCode]);
        }
    };
    const createApple = ()=>{
        
       return [Math.floor(Math.random()*(500/SCALE)),Math.floor(Math.random()*(500/SCALE))];
    };
    const checkCollision=(piece,snk = snake)=>{
        //console.log(piece);
        if(piece[0]*20>=500||piece[0]<0||piece[1]*20>=500||piece[1]<0){
            return true;
        }
        for(const segment of snk){
            if(piece[0]===segment[0]&&piece[1]===segment[1]) return true;
        }
        return false;
    };
    const checkAppleCollision= newSnake =>{
        if(newSnake[0][0]===apple[0]&&newSnake[0][1]===apple[1]){
            let newApple = createApple();
            while(checkCollision(newApple,newSnake)){
                newApple = createApple();
            }
            setApple(newApple);
            return true;
        }
        return false;
    };
    const gameLoop = ()=>{
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0]+dir[0],snakeCopy[0][1]+dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if(checkCollision(newSnakeHead)) endGame();
        if(!checkAppleCollision(snakeCopy)) snakeCopy.pop();
        
        setSnake(snakeCopy);
    };
    useEffect(()=>{
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE,0,0,SCALE,0,0);
        context.clearRect(0,0,500,500);
        context.fillStyle="pink";
        snake.forEach(([x,y])=>context.fillRect(x,y,1,1));
        context.fillStyle = "lightblue";
        context.fillRect(apple[0],apple[1],1,1);
    },[snake,apple,gameOver]);
    useInterval(()=>gameLoop(),speed);
    return (
        <>
         <Draggable bounds="parent">
         <div className="rounded-md shadow-lg absolute bg-gray-900" style={{zIndex:{zVal},height:"600px",width:"600px"}}>
             
             <div className="mb-2 text-center">
                 <IconButton onClick={()=>{
                     setCurrentList((prev)=>{return prev.filter((f) => f.id !== id);});
                 }} style={{outline:"none"}} >
                     <DeleteIcon style={{fill:"whitesmoke"}}></DeleteIcon>
                 </IconButton>
             </div>
             <div className="ml-12 focus:outline-none" role="button" tabIndex="0" onKeyDown={e=> moveSnake(e)} >
                 <canvas style={{border:"1px solid gray"}}
                    ref={canvasRef}
                    width={"500px"}
                    height={"500px"}
                  />
                <div className="flex">  
                
                 <button className="mt-1 mr-4 p-1 focus:outline-none rounded-md bg-gray-400" onClick={startGame}>Start Game</button>
                 {gameOver && <div className="text-white">GAME OVER!</div>}
                 </div>
             </div>
         </div>   
         </Draggable>
        </>
    )
}
