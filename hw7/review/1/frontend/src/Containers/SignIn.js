import '../App.css';
import {Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const SignIn = ({me , setMe, setSignedIn, displayStatus})=>(
    <>
        <div className='App-title'><h1>My Chat Room</h1></div>
        <Input.Search
        prefix={<UserOutlined/>}
        value={me}
        enterButton='Sign In'
        onChange={(e)=>setMe(e.target.value)}
        placeholder='Enter your name'
        size='large'
        style={{width:300, margin:50}}
        onSearch={(name)=>{
            if (!name){
                displayStatus({
                    type:'error',
                    msg:'Missing user name',
                })
            }
            else setSignedIn(true)}}
        ></Input.Search>
    </>
)
export default SignIn
