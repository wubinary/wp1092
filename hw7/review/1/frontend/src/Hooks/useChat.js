import { useState } from "react";

//const client = new WebSocket('ws://localhost:8080')

const useChat=()=>{
    const [status,setStatus]=useState({});
    const sendMessage=(payload)=>{
        console.log(payload)
    }
    return {status,sendMessage}
}
export default useChat