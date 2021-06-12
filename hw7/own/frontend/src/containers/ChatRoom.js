import { useState, useEffect } from "react"
import { Button, Input, Tabs } from 'antd'
import { Avatar, Layout } from 'antd'
import { Row, Col } from 'antd'
import ChatModal from '../components/ChatModal.js'
import useChatBox from '../hooks/useChatBox.js'
import useChat from '../hooks/useChat.js'

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const client = new WebSocket("ws://localhost:8080");

function App({ me, displayStatus }) {

  
  client.onopen = () => console.log('Server connected.');
  client.onmessage = (m) => onEvent(JSON.parse(m.data));
  
  const [chatBoxes, setChatBoxes] = useState([
    // { friend: "Mary", key: "MaryChatbox",
    //   chatLog: [] },
    // { friend: "Peter", key: "PeterChatBox",
    //   chatLog: [] }
  ]);

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  const addChatBox = () => { setModalVisible(true); };

  const [ createChatBox, removeChatBox ] = useChatBox();
  const [ abc, sendMessage ] = useChat();

  const onEvent = (e) => {
      const { type } = e;

      switch (type) {
          case 'CHAT': {
              const { key, messages } = e.data;
              const newChatBoxes = [...chatBoxes];
              newChatBoxes.map( (row)=>{
                  if ( row.key == key )
                    row.chatLog = messages;
                  return row;
              });              
              console.log(newChatBoxes);
              setChatBoxes(newChatBoxes);
              // setChatBoxes(newChatBoxes);
              break;
          }
          case 'MESSAGE': {
              const { key, message } = e.data;

              const newChatBoxes = [...chatBoxes];
              newChatBoxes.map( (row)=>{
                  if ( row.key == key )
                    row.chatLog.push(message);
                  return row;
              });              
              console.log(newChatBoxes);
              setChatBoxes(newChatBoxes);

              break;
          }
      }

      // renderMessages();
  };

  const showMessages = (key) => {
    var messages = [];
    for (var i=0; i<chatBoxes.length; i++)
      if (chatBoxes[i].key == key) {
        messages = chatBoxes[i].chatLog;
        break;
      }
    return (
      <>
        {messages.map( m => (
          <p>
            { m.name===me ? 
              (<Row justify="end" align={'middle'}>
                <Col>
                  {m.body}
                </Col>
                <Col>&nbsp;</Col>
                <Col>
                  <Avatar >{m.name}</Avatar> 
                </Col>
              </Row>)
              : 
              (<Row justify="start" align={'middle'}>
                <Col>
                  <Avatar >{m.name}</Avatar> 
                </Col>
                <Col>&nbsp;</Col>
                <Col>
                  {m.body}
                </Col>
              </Row>)
            }
          </p>
          )
        )}
      </>);
  };

  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
      </div>
      <div className="App-messages">
        <Tabs 
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") removeChatBox(chatBoxes, setChatBoxes, activeKey, setActiveKey, targetKey);
          }} >
          {
            chatBoxes.map( ({friend, key, chatLog}) => { return (
                <TabPane 
                  tab={friend}
                  key={key}
                  closeable={true}>
                  {showMessages(activeKey)} 
                </TabPane>
              ); } )
          }
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={
            ({name}) => {
              createChatBox(chatBoxes, setChatBoxes, activeKey, setActiveKey, me, name, client);
              setModalVisible(false);
          }}
          onCancel={
            () => {
              setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value) }
        enterButton="Send"
        placeholder="Enter message here ... "
        onSearch={
          (msg) => { 
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message."
              });
              return;
            } else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first."
              });
              setMessageInput("");
              return;
            }
            sendMessage({
              type: 'MESSAGE',
              data: {
                name: me,
                to: activeKey.split("_").filter(e=>e!=me)[0] ? activeKey.split("_").filter(e=>e!=me)[0] : me,
                key: activeKey,
                body: msg
              }
            }, client);
            setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
  
}

export default App
