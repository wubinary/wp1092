import { useState } from "react";

const useChat = () => {

    const [status, setStatus] = useState({}); // {type, msg}
    const sendMessage = (payload, client) => {
        console.log(payload.data.to);
        client.send(JSON.stringify(payload));
    }; // {key, msg}

    return [status, sendMessage];
};
export default useChat;