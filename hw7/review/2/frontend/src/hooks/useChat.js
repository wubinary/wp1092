import { useState } from "react";
const client = new WebSocket('ws://localhost:8080')

const useChat = ()=>{
    const [messages, sstMessages] = useState('')
    const [status, setStatus] = useState('')


    const sendData = async (data) => {// { sender:me, body:msg }
        await client.send(JSON.stringify(data));
    };
    
    const sendMessage = (payload) => {
        sendData(["MESSAGE", payload]);
    };    
    return {status, messages, sendMessage}
}

export default useChat;