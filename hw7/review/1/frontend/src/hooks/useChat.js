import { useState } from "react";

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');

server.sendEvent = (e) => server.send(JSON.stringify(e));




const handleSend = async (payload) => {
  let {to,name} = payload
  await server.sendEvent({
    type: 'MESSAGE',
    data: { to: payload.to , name: payload.name, body: payload.body},
  });
};
/*
const handleChatBox = async (payload) =>{
  server.sendEvent({
    type: 'MESSAGE',
    data: { to: , name: , body: },
  });
}*/

const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendMessage = (payload) => {
    console.log(payload);
    handleSend(payload);
    server.onmessage = (m) => {
      const { type } = JSON.parse(m.data);
      console.log(JSON.parse(m.data).data.message);
    };
  }; // { key, msg }
  return { status, sendMessage };
};

export default useChat;