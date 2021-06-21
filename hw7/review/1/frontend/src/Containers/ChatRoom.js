import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import Message from "../Components/Message";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";

const { TabPane } = Tabs;
const LOCALSAVEDACTIVE_KEY = "save-active";
const ChatRoom = ({ me, displayStatus }) => {
  const loadActive = () => {
    return JSON.parse(localStorage.getItem(LOCALSAVEDACTIVE_KEY)) || {};
  };
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState(loadActive()[me] || "");

  const { chatBoxes, createChatBox, removeChatBox, setChatLog } =
    useChatBox(me);
  const { status, sendMessage, sendActive } = useChat();

  useEffect(() => {
    // console.log(activeKey);
    if (activeKey !== "") {
      sendActive(activeKey);
      let savedActive = loadActive();
      savedActive[me] = activeKey;
      localStorage.setItem(LOCALSAVEDACTIVE_KEY, JSON.stringify(savedActive));
    }
  }, [activeKey]);

  useEffect(() => {
    setChatLog(activeKey, status);
  }, [status]);

  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove")
              setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            // console.log(key, chatLog);
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <div className="message-box">
                  {chatLog &&
                    chatLog.map(({ name, body }) => (
                      <Message mine={name === me} name={name} body={body} />
                    ))}
                </div>
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          displayStatus={displayStatus}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          } else if (activeKey === "") {
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.",
            });
            setMessageInput("");
            return;
          }
          sendMessage({ key: activeKey, body: msg });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
