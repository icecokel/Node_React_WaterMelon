import { useState } from "react";

// TODO state가 제대로 적대 되지 않음 개선
// Redux 사용 고려

const ChatRoom = (props: any) => {
  const [receivedMessage, setReceivedMessage] = useState<Array<any>>([]);
  const [message, setMessage] = useState<string>("");
  const nickname = window.sessionStorage.getItem("nickname");
  const webSocket = props.webSocket;

  webSocket.onmessage = (e: any) => {
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = [...receivedMessage];
    tempReceivedMessageList.push(JSON.parse(msgObj.message));
    setReceivedMessage(tempReceivedMessageList);

    console.log(tempReceivedMessageList);
  };

  const sendMessage = () => {
    const params = { nickname: nickname, message: message };
    webSocket.send(JSON.stringify(params));
    setMessage("");
  };

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box">
        <ul>
          {receivedMessage &&
            receivedMessage.map((item, idex) => {
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
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatRoom;
