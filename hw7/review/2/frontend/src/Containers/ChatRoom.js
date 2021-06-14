import "../App.css";
import { useEffect, useState } from "react";
import { Tabs, Input, Tag} from "antd";
import ChatModal from '../Components/ChatModal'
import useChatBox from '../hooks/useChatBox'
import useChat from '../hooks/useChat'

const { TabPane } = Tabs;
const ChatRoom = ({ me , displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("")
  const {chatBoxes, createChatBox, removeChatBox, showChatLog } = useChatBox(me, activeKey);
  const { status, messages, sendMessage, getChatLog } = useChat(me);

  const addChatBox = () => { setModalVisible(true); };

  useEffect(() => {
    showChatLog(activeKey, messages)
  }, [messages])

  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card" 
              activeKey={activeKey}
              onChange={(key) => { setActiveKey(key); }}    
              onEdit={(targetKey, action) => {
                if (action === "add") addChatBox();
                else if (action === "remove") setActiveKey(removeChatBox(targetKey));
              }}>
          {chatBoxes.map((
            { friend, key, chatLog }) => {
                return (
                    <TabPane tab={friend} 
                      key={key} closable={true}>
                        {(chatLog) ?  (chatLog.map(({name, body}, i) => {
                          return (name === friend) ? (
                            <p key={`${name}_${i}`}>
                              {/* {friend}'s chatbox. */}
                              {name} <Tag color='blue'>{body}</Tag>
                            </p>
                          ) : (
                            <p key={`${name}_${i}`} style={{textAlign: 'right'}}>
                              <Tag color='blue'>{body}</Tag> {name}
                            </p>
                          )})) : (<></>)
                        }
                    </TabPane>
                );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            getChatLog(me, name)
            setActiveKey(createChatBox(name)) ;
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
          sendMessage({ key: activeKey, body: msg });
          setMessageInput("");
        } }
      ></Input.Search> 
    </>);
};
export default ChatRoom;