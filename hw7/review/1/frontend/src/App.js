import './App.css'
import { Button, Input, message, Tag } from 'antd'
import SignIn from './Containers/SignIn'
import ChatRoom from './Containers/ChatRoom'
import { useEffect, useRef, useState } from 'react';

const LOCALSTORAGE_KEY = 'save-me'
function App() {

const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const [signedIn, setsignedIn] = useState(false);
const [me, setMe] = useState(savedMe || "");
useEffect(() => {
  if(signedIn){
    localStorage.setItem(LOCALSTORAGE_KEY,me)
  }
},[signedIn])

const displayStatus = (payload)=>{
  if(payload.msg){
    const {type,msg}=payload
    const content = {
      content: msg,duration:0.5
    }
    switch (type){
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


return (
  <div className="App">
    {signedIn?(<ChatRoom me={me} displayStatus={displayStatus}/>):(<SignIn me={me} setMe={setMe} setSignedIn={setsignedIn} displayStatus={displayStatus}/>)}
  </div>
)

}

export default App
