import { useState } from "react";

// TODO state가 제대로 적대 되지 않음 개선
// Redux 사용 고려

const ChatRoom = (props: any) => {
  const [message, setMessage] = useState<string>("");
  const dd: Array<any> = props.receivedMessages ?? [];

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
          {dd &&
            dd.map((item, idex) => {
              return <li key={idex}> {item.message}</li>;
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
