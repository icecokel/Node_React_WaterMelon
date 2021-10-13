import { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import ChatTab from "./ChatTab";

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [receivedMessages, setReceivedMessages] = useState<Array<any>>([]);
  const nickname = window.sessionStorage.getItem("nickname");
  const webSocket: WebSocket = props.webSocket;

  webSocket.onmessage = (e: any) => {
    console.log("onmessage");

    const msgObj = JSON.parse(e.data);
    console.log(msgObj);
    const tempReceivedMessageList = [...receivedMessages];
    tempReceivedMessageList.push(JSON.parse(msgObj.message));
    setReceivedMessages(tempReceivedMessageList);
  };

  const sendMessage = (message: string) => {
    console.log("sendMessage");
    const params = { nickname: nickname, message: message };
    props.isOnReady && webSocket.send(JSON.stringify(params));
  };

  useEffect(() => {
    !props.ioLogined && loginCheck();
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
      <ChatTab key="chatTab_1" callAPI={callAPI} />
      <ChatRoom
        key="chatbox_1"
        receivedMessages={receivedMessages}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Main;
