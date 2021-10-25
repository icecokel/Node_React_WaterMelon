import { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import ChatTab from "./ChatTab";

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;
  const nickname = window.sessionStorage.getItem("nickname");
  const webSocket: WebSocket = props.webSocket;

  const sendMessage = (message: string) => {
    const params = { nickname: nickname, message: message };
    props.isOnReady && webSocket.send(JSON.stringify(params));
  };

  useEffect(() => {
    !props.isLogined && loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickname", res.nickname);
    props.setIsLogined(res.isLogined);
  };
  return (
    <div className="main_box">
      <ChatTab key="chatTab_1" callAPI={callAPI} isLogined={props.isLogined} />
      <ChatRoom
        key="chatbox_1"
        receivedMessages={props.receivedMessages}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Main;
