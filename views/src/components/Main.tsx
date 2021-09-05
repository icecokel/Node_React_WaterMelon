import e from "express";
import { useState } from "react";
import { useEffect } from "react";
import FrontConfig from "../frontConfig";

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;

  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickName", res.nickName);
    props.setIsLogined(res.isLogined);
  };
  return (
    <div className="main_box">
      <ChatTab />
      <ChatBox />
    </div>
  );
};

const ChatTab = (props: any) => {
  // TODO 방 목록 및 친구 목록 디자인.
  return <div className="chatList_box">채팅방 목록</div>;
};

const webSocket: WebSocket = new WebSocket(FrontConfig.webSocker.baseUrl);
webSocket.onopen = (e) => {
  console.info("Server Connected");
};

const ChatBox = (props: any) => {
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<Array<string>>([]);

  useEffect(() => {}, [receivedMessage]);

  webSocket.onmessage = (e) => {
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = receivedMessage ?? [];
    tempReceivedMessageList.push(msgObj.message);

    // TODO 렌더링 속도 개선
    setReceivedMessage(tempReceivedMessageList);
  };

  const sendMessage = () => {
    // 메시지 및 Sender 추가
    webSocket.send(message);
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
        {receivedMessage.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
      <div className="chat_send_Message_box">
        <input
          type="text"
          className="chat_send_Message"
          value={message}
          onKeyPress={onPressEnter}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="chat_send_btn" onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default Main;
