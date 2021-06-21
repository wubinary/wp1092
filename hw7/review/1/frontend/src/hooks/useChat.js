import { useState } from "react";

const client = new WebSocket("ws://localhost:8080");

const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };
  const sendMessage = (payload) => {
    // console.log(payload);
    const names = payload.key.split("_");
    const data = {
      type: "MESSAGE",
      data: { name: names[0], to: names[1], body: payload.body },
    };
    sendData(data);
  }; // { key, msg }
  const sendActive = (payload) => {
    // console.log(payload);
    const names = payload.split("_");
    const data = {
      type: "CHAT",
      data: { name: names[0], to: names[1] },
    };
    sendData(data);
  };
  client.onmessage = (byteString) => {
    const string = byteString.data;
    const { type, data } = JSON.parse(string);
    switch (type) {
      case "CHAT": {
        setStatus({ type, msg: data.messages });
        break;
      }
      case "MESSAGE": {
        if (!status.msg) {
          setStatus({ type, msg: [data.message] });
        } else {
          setStatus(({ type, msg }) => ({
            type,
            msg: [...msg, data.message],
          }));
        }
        break;
      }
      default:
        break;
    }
    // setStatus(JSON.parse(data));
  };
  return { status, sendMessage, sendActive };
};
export default useChat;
