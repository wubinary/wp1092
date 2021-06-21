import { useState } from "react";
const client = new WebSocket('ws://localhost:8080')

const useChatBox = (displayStatus, activeKey)=>{
    const [chatBoxes, setChatBoxes] = useState([]);


    client.onmessage = function(m){
      const [ type, data ]=JSON.parse(m.data)
      if(type==='CHAT'){
        const { name, messages } = data
        const new_boxes=[...chatBoxes]
        new_boxes.push({key:name, name, messages})
        setChatBoxes(new_boxes)
      }
      else if(type==='MESSAGE') {
        const message = data
        chatBoxes.forEach((box, index)=>{
          if (box.key===activeKey){
            const new_boxes=[...chatBoxes]
            new_boxes[index].messages.push(message)
            setChatBoxes(new_boxes)
          }
        })
      }
    }

    const createChatBox = async (friend, me, setActiveKey) => {
      // data:{users:[],messages:[],name:a_b}
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          displayStatus({
            type: "error",
            msg: "box already opened"
          })
        }
        else await client.send(JSON.stringify(
          ["CHAT", { name:me , to:friend }]
        ))
        return newKey;
      };

    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
          if (key === targetKey) { lastIndex = i - 1; }});
        const newChatBoxes = chatBoxes.filter(
          (chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
          if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newChatBoxes[lastIndex].key;
            } else { newActiveKey = newChatBoxes[0].key; }
          }
        } else newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes)
        return newActiveKey;
    };

    return {chatBoxes, setChatBoxes, createChatBox, removeChatBox}
}

export default useChatBox;