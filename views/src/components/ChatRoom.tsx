import { useState } from "react";
import ChatBubble from "./ChatBubble";

const ChatRoom = (props: any) => {
  const [message, setMessage] = useState<string>("");
  const messages: Array<any> = props.receivedMessages ?? [];

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      props.sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box">
        <ul>
          {messages &&
            messages.map((item, idex) => {
              console.log(item);

              return (
                <ChatBubble
                  key={idex}
                  nickname={item.nickname}
                  message={item.message}
                />
              );
            })}
        </ul>
      </div>
      <div className="chat_send_Message_box">
        <input
          type="text"
          value={message}
          onKeyPress={onPressEnter}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.sendMessage(message);
            setMessage("");
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
