import './App.css'
import SignIn from './Containers/Signin';
import ChatRoom from './Containers/ChatRoom';
import { Button, Input, message } from 'antd'
import { useState, useEffect } from 'react';

const LOCALSTORAGE_KEY = 'save-me'
const App = () => {
  const savedME = localStorage.getItem(LOCALSTORAGE_KEY)
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedME || "");
 
  const displayStatus = (payload)=>{
    if (payload.msg) {
      const {type, msg} = payload
      const content = { content: msg, duration: 1.5}
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
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

  // useEffect(()=>{
  //   displayStatus(status)
  // }, [status])

  return (
    <div className="App">
      {signedIn? (
        <ChatRoom me={me} displayStatus={displayStatus}/>
        ) : (
        <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>)}
    </div>
  );
};


export default App
