const ChatBubble = (props: any) => {
  const nickname = window.sessionStorage.getItem("nickname");
  if (nickname === props.nickname) {
    return <li className="chat_bubble_self">{props.message}</li>;
  } else {
    return (
      <li className="chat_bubble_target">
        <span>{props.nickname}</span>
        <p>{props.message}</p>
      </li>
    );
  }
};

export default ChatBubble;
