import {keys} from "../logic/game-state"
document.addEventListener("keydown", (e)=>{
    let key = e.key
    if (e.key === "Space"){
        keys["Space"] = true
    }else if(e.key === "ArrowLeft"){
        keys["ArrowLeft"] = true
    }else if(e.key === "ArrowRight"){
        keys["ArrowRight"] = true  
    }
})