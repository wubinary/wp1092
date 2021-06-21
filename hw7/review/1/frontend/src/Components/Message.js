const Message = ({ mine, name, body }) => {
  return mine ? (
    <div className="message-line my-message">
      <div className="message-content">{body}</div>
      <div>{name}</div>
    </div>
  ) : (
    <div className="message-line friend-message">
      <div>{name}</div>
      <div className="message-content">{body}</div>
    </div>
  );
};
export default Message;
