import { useState } from "react";
import { message as AntMessage } from "antd";
import axios from "../axios";


const useChat = () => {
  const client = new WebSocket('ws://localhost:4000')
  const [chat, setChat] = useState(null)

  client.onmessage = (byteString) => {
    const res = byteString.data;
    setChat(JSON.parse(res));
  }

  const sendData = async (data) => {
    try {
      await client.send(JSON.stringify(data))
    }
    catch (err) {
      AntMessage.error(err)
    }
  };

  const sendMessage = (user, friend, message) => {
    sendData({
      type: "MESSAGE",
      data: {
        name: user,
        to: friend,
        body: message
      }
    });
  };

  const startChat = (user, friend) => {
    sendData({
      type: "CHAT",
      data: {
        name: user,
        to: friend
      },
    });
  };

  return { chat, sendMessage, startChat };
};
export default useChat;