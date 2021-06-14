import {useState} from 'react';

const client = new WebSocket('ws://localhost:8080')

const useChatBox=()=>{
    const [chatBoxes,setChatBoxes]=useState([]);
    const [activeKey, setActiveKey] = useState("");

    const sendData = async (data)=>{
        await client.send(JSON.stringify(data))}

    const createChatBox = (friend,me) => {
        const newKey=me <=friend?`${me}_${friend}`:`${friend}_${me}`;
        if (chatBoxes.some(({key})=>key===newKey)){
            throw new Error(`${friend}'s chat box has already opened`)
        }
        const newChatBoxes=[...chatBoxes];
        const chatLog=[];
        newChatBoxes.push({friend,key:newKey,chatLog});
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey)
        sendData({type:'CHAT',data:{to:friend,name:me}})
        //return newKey 
    }
    const removeChatBox = (targetKey,activeKey)=>{
        let newActiveKey=activeKey;
        let lastIndex;
        chatBoxes.forEach(({key},i)=>{
            if (key===targetKey){lastIndex=i-1;}})
        const newChatBoxes=chatBoxes.filter(
            (chatBoxe)=>chatBoxe.key!==targetKey)
        if (newChatBoxes.length){
            if (newActiveKey===targetKey){
                if (lastIndex>=0){
                    newActiveKey=newChatBoxes[lastIndex].key
                }else{newActiveKey=newChatBoxes[0].key}
            }
        }else newActiveKey='';
        setChatBoxes(newChatBoxes)
        return newActiveKey
    }

    client.onmessage = (byteString)=>{
        const {data}=byteString
        const {type}=JSON.parse(data)

        switch(type){
          case 'CHAT':{
              const {messages}=JSON.parse(data).data
              let newChatBoxes=[...chatBoxes];
              let targetIndex
              const newChatLog=[...messages];
              newChatBoxes.forEach(({key},i)=>{
                if (key===activeKey){targetIndex=i;}})
              newChatBoxes[targetIndex].chatLog=newChatLog
              setChatBoxes(newChatBoxes);
              break;
          }

          case 'MESSAGE':{
              const {message}=JSON.parse(data).data
              let newChatBoxes=[...chatBoxes];
              let targetIndex
              newChatBoxes.forEach(({key},i)=>{
                if (key===activeKey){targetIndex=i;}})
              const newChatLog=newChatBoxes[targetIndex].chatLog;
              newChatLog.push(message)
              newChatBoxes[targetIndex].chatLog=newChatLog
              setChatBoxes(newChatBoxes);
              break;
        }
        }
    }

    return {chatBoxes,createChatBox,removeChatBox,sendData,activeKey, setActiveKey}
}
export default useChatBox;