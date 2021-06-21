import "./App.css";
import { useState, useEffect } from "react";
import SignIn from "./containers/SignIn"
import ChatRoom from "./containers/ChatRoom"
import { message } from "antd"

const LOCALSTORAGE_KEY = "save-me";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 1.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);

  // useEffect(() => {
  //   displayStatus(status)
  // }, [status])

  return (
    <div className="App">
      {signedIn ?
        (<ChatRoom me={me} 
          displayStatus={displayStatus}
        />) :
        (<SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />)}
    </div>
  );
};
export default App;