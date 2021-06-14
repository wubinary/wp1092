import { useState } from "react";  

const client = new WebSocket('ws://localhost:4000')

const useChat = (me) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({}); // { type, msg }
  client.onmessage = (byteString) => {
    const stringData = byteString.data
    const {type, data} = JSON.parse(stringData)
    switch (type) {
      case 'CHAT': {
        const {messages} = data
        setMessages(messages);
        break;
      }
      case 'MESSAGE': {
        // console.log(messages)
        const {message} = data
        const newMessages = [...messages, message]
        setMessages(newMessages);
        break;
      }
    }
  }

  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  }

  const getChatLog = (name, to) => {
    sendData({type: 'CHAT', data: { name, to }});
  }

  const sendMessage = (payload) => {
    const {key, body} = payload
    const [p1, p2] = key.split('_')
    const [name, to] = (p1 === me) ? ([p1, p2]) : ([p2, p1])
    // console.log(name)
    sendData({type: 'MESSAGE', data: {name, to, body}})
    // console.log(payload);
  }; // { key, msg }
  return { status, messages, sendMessage, getChatLog };
};
export default useChat;