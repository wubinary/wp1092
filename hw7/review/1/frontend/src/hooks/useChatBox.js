import { message } from 'antd';
import {useState} from 'react'

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');



const useChatBox = (me,activeKey,chatBoxes,setChatBoxes) => {
    const senddata =async (e) => {await server.send(JSON.stringify(e));}
    const handleChatBox = (payload) => {
      senddata({
        type: 'CHAT',
        data: { to: payload.to , name: payload.name},
      });
    
    };
    

    const createChatBox = (friend) => {
      
        const newKey =  friend;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +"'s chat box has already opened.");
        }
        handleChatBox({to:friend,name:me})
        
          
        
        
        return newKey;
      };

      const removeChatBox = (targetKey) => {
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
        setChatBoxes(newChatBoxes);
        return newActiveKey;
      };

      return {createChatBox,removeChatBox,server}
}

export default useChatBox;
