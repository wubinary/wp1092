import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import Message from "../components/Message";

import useChat from "../hooks/useChat"
import useChatBox from "../hooks/useChatBox"


const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  const addChatBox = () => { setModalVisible(true); };
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const { chat, sendMessage, startChat } = useChat();

  useEffect(() => {
    if (chat === null)
      return

    const { type, data } = chat

    switch (type) {
      case "CHAT": {
        setMessages(data.messages);
        break;
      }
      case "MESSAGE": {
        setMessages([...messages, data.message])
        break;
      }
      default: break;
    }
  }, [chat])

  return (
    <> <div className="App-title">
      <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          onEdit={(targetKey, action) => {
            if (action === "add")
              addChatBox();
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            const friend = chatBoxes.find(chatBox => chatBox.key === key).friend
            startChat(me, friend)
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                {
                  messages.map(({ name, body }, i) =>
                    <Message me={me} name={name} message={body} key={i}></Message>
                  )
                }
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            startChat(me, name)
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) =>
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
        "Enter message here..."
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
          // get friend name

          const conversation = activeKey.split('_')
          const me_idx = conversation.indexOf(me)
          const friend_idx = me_idx === 0 ? 1 : 0
          const friend = conversation[friend_idx]

          sendMessage(me, friend, msg);
          setMessageInput("");
        }}
      ></Input.Search>
    </>);
};

export default ChatRoom;