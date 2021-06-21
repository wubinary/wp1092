import { useState, useEffect } from "react";

const LOCALSAVEDTABS_KEY = "save-tabs";
const useChatBox = (me) => {
  const loadChatBox = () => {
    const savedTabs =
      JSON.parse(localStorage.getItem(LOCALSAVEDTABS_KEY)) || {};
    const mySavedTabs = savedTabs[me] || [];
    return mySavedTabs.map((friend) => ({
      friend,
      key: `${me}_${friend}`,
      chatLog: [],
    }));
  };

  const [chatBoxes, setChatBoxes] = useState(loadChatBox(me));

  const saveChatBox = () => {
    let savedTabs = JSON.parse(localStorage.getItem(LOCALSAVEDTABS_KEY)) || {};
    savedTabs[me] = chatBoxes.map((chatBox) => chatBox.friend);
    localStorage.setItem(LOCALSAVEDTABS_KEY, JSON.stringify(savedTabs));
  };

  useEffect(() => {
    // console.log(chatBoxes);
    if (chatBoxes !== []) {
      saveChatBox();
    }
  }, [chatBoxes]);

  const createChatBox = (friend, me) => {
    // const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    const newKey = `${me}_${friend}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey
    );
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };

  const setChatLog = (activeKey, status) => {
    setChatBoxes(
      chatBoxes.map((chatBox) => {
        if (chatBox.key === activeKey) {
          return { ...chatBox, chatLog: status.msg };
        } else return chatBox;
      })
    );
  };

  return { chatBoxes, createChatBox, removeChatBox, setChatLog };
};

export default useChatBox;
