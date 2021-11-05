const ChatBubble = (props: any) => {
  const nickname = window.sessionStorage.getItem("nickname");
  if (nickname === props.nickname) {
    return (
      <li className="chat_bubble_self" id={props.id}>
        {props.message}
      </li>
    );
  } else {
    return (
      <li className="chat_bubble_target" id={props.id}>
        <span>{props.nickname}</span>
        <p>{props.message}</p>
      </li>
    );
  }
};

export default ChatBubble;
