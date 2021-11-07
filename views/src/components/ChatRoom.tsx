import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";

const ChatRoom = (props: any) => {
  const [message, setMessage] = useState<string>("");
  const nickname = window.sessionStorage.getItem("nickname");
  const webSocket: WebSocket = props.webSocket;
  const [receivedMessages, setReceivedMessages] = useState<Array<any>>([]);

  useEffect(() => {
    goToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessages]);

  const goToBottom = () => {
    const lastLi = document.getElementById(
      "cb_" + (receivedMessages.length - 1)
    );
    lastLi?.scrollIntoView();

    // TODO 스크롤바가 맨아래로 자동으로 세팅 되게
  };

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      sendMessage(message);
      setMessage("");
    }
  };

  if (!webSocket) {
    return <div></div>;
  }

  const sendMessage = (message: string) => {
    const params = { nickname: nickname, message: message };
    webSocket.send(JSON.stringify(params));
  };

  webSocket.onmessage = (e: any) => {
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = [...receivedMessages];

    tempReceivedMessageList.push(JSON.parse(msgObj.message));
    if (tempReceivedMessageList.length !== receivedMessages.length) {
      setReceivedMessages(tempReceivedMessageList);
    }
  };

  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box" id="chat_content_box">
        <ul>
          {receivedMessages &&
            receivedMessages.map((item, index) => {
              const lastIndex = receivedMessages.length - 1;

              return (
                <ChatBubble
                  id={"cb_" + index}
                  key={index}
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
            sendMessage(message);
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
