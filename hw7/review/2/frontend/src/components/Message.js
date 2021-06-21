const Message = ({me, mes})=>{
    const { sender, body } = mes
    const myMessage = (me===sender)
    if(myMessage){
        return (
            <p className="message_right">
                <span className="text_body">{body}</span>
                <span>{sender}</span>
            </p>
        )
    }else{
        return (
            <p className="message_left">
                <span>{sender}</span>
                <span className="text_body">{body}</span>
            </p>
        )
    }
}

export default Message