import { useState } from 'react';

const useChatBox = () => {
 
    const createChatBox = async (chatBoxes, setChatBoxes, activeKey, setActiveKey, me, friend, client) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({key}) => key===newKey)) {
          throw new Error(friend + "'s chat box has already opened.");
        }
        var newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
        
        // ws send createChatRoom
        client.send(JSON.stringify({
          type: 'CHAT',
          data: { to: friend, name: me },
        }));
    }
    const removeChatBox = (chatBoxes, setChatBoxes, activeKey, setActiveKey, targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(
          ({key}, i) => {
            if (key === targetKey) {
              lastIndex = i-1;
            }
          }
        );
        const newChatBoxes = chatBoxes.filter(
          (chatBox) => chatBox.key !== targetKey
        );
        if (newChatBoxes.length) {
          if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newChatBoxes[lastIndex].key;
            } else { newActiveKey = newChatBoxes[0].key; }
          }
        } else newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);
    }

    return [ createChatBox, removeChatBox ];
}

export default useChatBox;