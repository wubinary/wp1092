import { useState } from "react"; 
const useChatBox = (me, activeKey) => {
    const [chatBoxes, setChatBoxes] = useState([
        { friend: "Mary", key: "MaryChatbox", 
          chatLog: [{name: 'Mary', body: 'hi'}, {name: 'Andy', body: 'hello'}] },
        { friend: "Peter", key: "PeterChatBox", 
          chatLog: [] }
      ]);

    const createChatBox = (friend) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +
                          "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        // console.log(messages)
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
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
    const showChatLog = (activeKey, messages) => {
      const newChatBoxes = [...chatBoxes];
      newChatBoxes.map(({ key }, i) => {
        if (key === activeKey) {
            newChatBoxes[i].chatLog = messages
        }
      })
      // console.log('tset')
      setChatBoxes(newChatBoxes)
    }

  return {chatBoxes, createChatBox, removeChatBox, showChatLog };
};
export default useChatBox;