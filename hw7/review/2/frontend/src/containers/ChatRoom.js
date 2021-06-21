import "../App.css";
import { useState } from "react";
import { Tabs, Input } from "antd";
import ChatModal from "./ChatModal";
import Message from "../Components/Message"

import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
const { TabPane } = Tabs;
const client = new WebSocket('ws://localhost:8080')

const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");

    const addChatBox = () => { setModalVisible(true); };
    
    const { chatBoxes, setChatBoxes, createChatBox, removeChatBox }
     = useChatBox(displayStatus, activeKey);
    const { sendMessage } = useChat();
    return (
    <>
        <div className="App-title">
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className="App-messages">
            <Tabs 
                type="editable-card" 
                onEdit={(targetKey, action) => {
                    if (action === "add") {addChatBox();}
                    else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                }} 
                activeKey={activeKey} 
                onChange={(key) => { setActiveKey(key); }}
            >
                {chatBoxes.map((
                    { name, messages}) => {
                        const [name1, name2] = name.split("_")
                        const friend = (name1!==me)? name1:name2;
                        return (
                            <TabPane tab={friend} key={name} closable={true}>
                                <p>{friend}'s chatbox.</p>
                                {messages.map((message)=>{
                                    return(
                                        <Message me={me} mes={message}></Message>
                                    )
                                }
                                )}
                            </TabPane>
                        );
                    }
                )}
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    if(name === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'name required'
                        })
                    }else{
                        createChatBox(name, me)
                        setActiveKey(me <= name ?
                            `${me}_${name}` : `${name}_${me}`);
                        setModalVisible(false);
                    }
                    
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
                sendMessage({ key:activeKey, sender:me, body:msg });
                setMessageInput("");
              }}
      
        ></Input.Search> 
    </>);
};
export default ChatRoom;
      