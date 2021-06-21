import "../App.css"
import {useState} from "react"
import {Tabs, Input} from "antd"
import ChatModal from "../Components/ChatModal"
import useChatBox from '../hooks/useChatBox'
import useChat from '../hooks/useChat'

const {TabPane} = Tabs;
const ChatRoom = ({me,displayStatus}) => {
    const [chatBoxes, setChatBoxes] = useState([
        {friend: "Mary", key: "Mary",chatLog: []},
        {friend: "Peter", key: "Peter",chatLog: [{name:"peter",body:"123"}]}
    ])
    const [messageInput, setMessagesInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey,setActiveKey] = useState("")
    const addChatBox = () => {setModalVisible(true)}
    const { createChatBox, removeChatBox,server} = useChatBox(me,activeKey,chatBoxes,setChatBoxes);
   const {sendMessage} = useChat();
   

   server.onmessage = (m) => {
    console.log(JSON.parse(m.data).data.messages);
    const { type } = JSON.parse(m.data);
    if(type ==='CHAT'){const newChatBoxes = [...chatBoxes];
      const chatLog = [...JSON.parse(m.data).data.messages];
      console.log(chatLog)
      newChatBoxes.push({ activeKey, friend: activeKey,key:activeKey, chatLog });
      setChatBoxes(newChatBoxes);
    }else if(type === 'MESSAGE'){
        const newChatBoxes = [...chatBoxes];
        const chatLog = JSON.parse(m.data).data.message;
        console.log(chatLog)
        for(let i = 0 ;i < newChatBoxes.length ; i++){
            console.log(newChatBoxes[i].friend + ' '+activeKey)
          if(newChatBoxes[i].friend === activeKey){
            newChatBoxes[i].chatLog.push(chatLog);
          }
        }
        console.log(newChatBoxes)
        setChatBoxes(newChatBoxes);
    }}

    return(
        <>
            <div className="App-title"><h1>{me}'s Chat Room</h1></div>
            <div className="App-messages">
                <Tabs type="editable-card" 
                activeKey={activeKey}
                onEdit={(targetKey,action)=>{
                    if(action==='add') addChatBox()
                    else if(action==='remove')setActiveKey(removeChatBox(targetKey))
                }}
                onChange={(key)=>{setActiveKey(key)}}>
                    {chatBoxes.map(({friend,key,chatLog})=>{
                        return(
                            <TabPane tab={friend}
                                    key={key}
                                    closable={true}
                                    >
                                <p>{friend}'s charbox. </p>
                                {chatLog.map((e,i)=><p key={i}>{e.name} :  {e.body}</p>)}
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name))
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e)=>setMessagesInput(e.target.value)}
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
                      setMessagesInput("");
                      return;
                    }
                    sendMessage({ to:activeKey,name:me,body:msg });
                    setMessagesInput("");
                  }}
          
            >
            </Input.Search>
        </> 
    )
}

export default ChatRoom;